export enum SOCKET_EVENTS {
  // System events
  CONNECT = "connect",
  CONNECT_ERROR = "connect_error",
  DISCONNECT = "disconnect",
  JOIN = "join",
  JOIN_ERROR = "joinError",
  ERROR = "error",
  // Notification events
  NOTIFICATION_NEW = "notificationNew",
  NOTIFICATIONS_FETCH = "notificationFetch",
  NOTIFICATIONS = "notifications",
  NOTIFICATIONS_CLEAR = "notificationsClear",
  NOTIFICATION_DELETE = "notificationDelete",
  NOTIFICATION_READ = "notificationRead",
  NOTIFICATION_UNREAD = "notificationUnread",
  // Chats events
  CHAT_FETCH = "chatFetch",
  MESSAGE = "message",
  // Matching events
  MATCH = "match",
  LIKE = "like",
  UNLIKE = "unlike", // If user are already matched
  VIEW = "view",
}
