import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../pages/App";

export default function Routes() {
  //console.log("🚀 ~ file: Routes.tsx:12 ~ Routes ~ user:", user);

  const router = React.useMemo(() => {
    return createBrowserRouter([
      {
        path: "/",
        element: <App />,
      },

      //{
      //  path: "/login",
      //  element: <Login />,
      //},
      //
      //{
      //  path: "/logout",
      //  element: <Logout />,
      //},
    ]);
  }, []);

  return <RouterProvider router={router} />;
}
