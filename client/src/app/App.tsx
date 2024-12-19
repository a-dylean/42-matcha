import { Routes, Route, BrowserRouter } from "react-router-dom";
import { routes } from "../utils/routes";
import { Home } from "@pages/home/Home";
import { Signup } from "@pages/auth/Signup";
import { Login } from "@pages/auth/Login";
import { Matches } from "@pages/browse/Matches";
import { Browse } from "@pages/browse/Browse";
import { Profile } from "@pages/profile/Profile";
import { Chat } from "@pages/chat/Chat";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { theme } from "@components/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path={routes.REGISTER} element={<Signup />} />
              <Route path={routes.LOGIN} element={<Login />} />

              <Route path={routes.MATCHES} element={<Matches />} />
              <Route path={routes.BROWSE} element={<Browse />} />
              <Route path={routes.PROFILE} element={<Profile />} />
              <Route path={routes.CHAT} element={<Chat />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
};