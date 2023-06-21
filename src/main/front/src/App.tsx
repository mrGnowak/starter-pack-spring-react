import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import { CurrentThemeProvider } from "./material/CurrentThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./UserProvider";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <>
      <CurrentThemeProvider>
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
