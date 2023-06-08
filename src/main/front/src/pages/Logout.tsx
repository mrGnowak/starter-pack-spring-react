import "../App.css";
import { useNavigate } from "react-router-dom";
import { useRefreshUser } from "../UserProvider";
import React from "react";
import { FormPageWrapper } from "../material/FormPageWrapper";
import { Box } from "@mui/material";

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
  return (
    <FormPageWrapper title={"Logging out..."}>
      <Box>Logging out...</Box>
    </FormPageWrapper>
  );
}
