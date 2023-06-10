import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { useUser } from "../UserProvider";
import { useIsMobile } from "../material/useIsMobile";
import { FormPageWrapper } from "../material/FormPageWrapper";
import { ResendConfirmationLinkButton } from "./ResendConfirmationLinkButton";

export default function ProfileInfo() {
  const user = useUser();
  const isMobile = useIsMobile();
  return (
    <FormPageWrapper title={"Your profile details"}>
      <Box
        sx={{
          p: 1,
        }}
      >
        <Divider sx={{ my: 1 }} />
        <Box
          sx={{
            display: isMobile ? "block" : "flex",
            gap: "5px",
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle1">E-mail: </Typography>
          <Typography sx={{ fontWeight: "800" }}>{user?.email}</Typography>
          <Box
            sx={{
              flexGrow: 1,
            }}
          />
          <Typography
            sx={(theme) => ({
              justifySelf: "flex-end",
              fontSize: "0.8rem",
              color: user?.emailConfirmed
                ? theme.palette.success.main
                : theme.palette.error.main,
            })}
          >
            {user?.emailConfirmed ? (
              " Your email is confirmed"
            ) : (
              <Box
                data-cy="notconfirmed"
                sx={{ textAlign: "right", marginTop: { xs: 5, md: 0 } }}
              >
                Your email is not confirmed.
                <br />
                Please check your email for confirmation link or ...
                <br />
                <ResendConfirmationLinkButton />
              </Box>
            )}
          </Typography>
        </Box>
      </Box>
    </FormPageWrapper>
  );
}
