import { Button } from "@mui/material";
import React from "react";
import { useUser } from "../UserProvider";

export function ResendConfirmationLinkButton() {
  const [disabled, setDisabled] = React.useState(false);
  const user = useUser();

  const onClick = async () => {
    setDisabled(true);
    try {
      const res = await fetch("/api/auth/resendConfirmationLink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
        }),
      });
      if (res.status === 200) {
        //const msg = FEEDBACKS['confirmation-link-sent'];
        //enqueueSnackbar(msg.text, { variant: msg.type });
      } else {
        throw new Error(await res.text());
      }
    } catch (error: any) {
      console.error("An unexpected error happened occurred:", error);
      //const msg = FEEDBACKS['unexpected-error'];
      //enqueueSnackbar(msg.text, { variant: msg.type });
      setDisabled(false);
    }
  };

  return (
    <Button size="small" color="error" onClick={onClick} disabled={disabled}>
      Resend confirmation link
    </Button>
  );
}
