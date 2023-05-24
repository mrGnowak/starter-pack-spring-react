import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import { CurrentThemeProvider } from "./material/CurrentThemeProvider";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      <CurrentThemeProvider>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </CurrentThemeProvider>
    </>
  );
}
