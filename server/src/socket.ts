import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { FRONTEND_ORIGIN, JWT_SECRET_KEY } from "@settings";
import { SOCKET_EVENTS } from "@src/interfaces/socketEventsInterface";
import { Request, Response, NextFunction } from "express";
import { authenticateSocketToken, authenticateToken } from "./middlewares/auth";
import { notificationModel } from "@src/models/notificationModel";

export const initializeSocket = (httpServer: HttpServer) => {
  /* ________________________________ Socket Setup ________________________________ */
  const io = new Server(httpServer, {
    cors: {
      origin: FRONTEND_ORIGIN,
      credentials: true,
    },
  });

  // Add middleware to parse cookies
  io.engine.use(cookieParser());

  // Add middleware to authenticate token
  io.engine.use(authenticateSocketToken);

  // Socket.IO connection handling
  io.on(SOCKET_EVENTS.CONNECT, (socket: Socket) => {
    console.log("[Socket] Client connected:", socket.id);

    /* ________________________________ Socket Data ________________________________ */

    // Get auth token from cookie
    const cookies = socket.handshake.headers.cookie?.toString();
    const authToken = cookies
      ?.split(";")
      .find((c) => c.trim().startsWith("authToken="))
      ?.split("=")[1];
    if (!authToken) {
      socket.emit("error", { message: "No auth token found" });
      return;
    }
    // Add user id to socket data
    socket.data.user = (jwt.decode(authToken) as { id: number }).id;
    socket.data.userRoom = `user_${socket.data.user}`;

    // Listen for client joining their own room
    socket.on(SOCKET_EVENTS.JOIN, async (room: string) => {
      try {
        const userRoom = socket.data.userRoom;
        // Check basic room name format based on user id
        if (room !== userRoom) {
          socket.emit("error", { message: "Invalid room name" });
          return;
        }

        // Check if user already in room
        const rooms = io.sockets.adapter.rooms;
        if (rooms.get(userRoom)) {
          return;
        }

        await socket.join(userRoom);
        socket.emit(SOCKET_EVENTS.MESSAGE, {
          message: "Welcome to the server - user : " + socket.data.user,
        });
      } catch (error) {
        console.error("[Socket] Socket join error:", error);
        socket.emit("error", { message: "Failed to join room" });
      }
    });

    /* ________________________________ Socket Events ________________________________ */

    socket.on(SOCKET_EVENTS.NOTIFICATIONS_FETCH, async (data) => {
      console.log(
        "[Socket] Fetching notifications for user:",
        socket.data.user
      );
      // Fetch notifications from database
      const notifications = await notificationModel.getNotifications(
        socket.data.user
      );
      console.log("[Socket] Notifications fetched:", notifications);
      // Emit notifications to client
      socket.emit(SOCKET_EVENTS.NOTIFICATIONS, notifications);
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, async () => {
      console.log("[Socket] Client disconnected:", socket.id);
    });
  });

  /* ________________________________ Socket Adapter ________________________________ */

  // Monitor room joins
  io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`[Socket] ${id} joined room: ${room}`);
  });

  return io;
};
