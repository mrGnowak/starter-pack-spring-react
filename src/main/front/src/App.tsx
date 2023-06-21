import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import { CurrentThemeProvider } from "./material/CurrentThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./UserProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarCloseButton } from "./components/SnackbarCloseButton";

export default function App() {
  return (
    <>
      <CurrentThemeProvider>
        <CssBaseline />
        <SnackbarProvider
          preventDuplicate
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          action={(key) => <SnackbarCloseButton barKey={key} />}
        />
        <UserProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <Layout>
                <AppRoutes />
              </Layout>
            </ErrorBoundary>
          </BrowserRouter>
        </UserProvider>
      </CurrentThemeProvider>
    </>
  );
}
