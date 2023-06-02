import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import { CurrentThemeProvider } from "./material/CurrentThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./UserProvider";

export default function App() {
  return (
    <>
      <CurrentThemeProvider>
        <UserProvider>
          <BrowserRouter>
            <Layout>
              <AppRoutes />
            </Layout>
          </BrowserRouter>
        </UserProvider>
      </CurrentThemeProvider>
    </>
  );
}
