import ".././styles/App.css";
import { useNavigate } from "react-router-dom";
import { useRefreshUser } from "../UserProvider";
import React from "react";

export default function Logout() {
  const navigate = useNavigate();
  const refreshUser = useRefreshUser();

  React.useEffect(() => {
    const logout = async () => {
      try {
        await fetch("api/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        console.warn(`Logout exception ${e}`);
      } finally {
        navigate("/");
        refreshUser();
      }
    };
    logout();
  }, [navigate, refreshUser]);
}
