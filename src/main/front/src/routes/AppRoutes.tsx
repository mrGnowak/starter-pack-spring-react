import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Signup from "../pages/signup";
import { useUser } from "../UserProvider";

export default function AppRoutes() {
  const user = useUser();
  console.log("🚀 ~ file: Routes.tsx:12 ~ Routes ~ user:", user);
  return (
    <Routes>
      {<Route path="/" element={<Home />} />}
      {<Route path="/about" element={<About />} />}
      {<Route path="/login" element={<Login />} />}
      {<Route path="/signup" element={<Signup />} />}
    </Routes>
  );
}
