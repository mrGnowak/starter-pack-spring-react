import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { CurrentThemeProvider } from "./material/CurrentThemeProvider";

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
