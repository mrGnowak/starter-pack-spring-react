import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FormPageWrapper } from "../material/FormPageWrapper";
import { useForm } from "react-hook-form";
import { fieldRegisterWrapper } from "../material/fieldRegisterWrapper";
import { isValidEmailAddress } from "../material/isValidEmailAddress";
import { useNavigate } from "react-router-dom";
import { useRefreshUser } from "../UserProvider";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const refreshUser = useRefreshUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({});
  const onSubmit = handleSubmit(async (data) => {
    try {
      await fetch("api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      navigate("/");
      refreshUser();
    } catch (e) {
      console.log(e);
    }
  });

  const field = fieldRegisterWrapper(register, errors);

  return (
    <FormPageWrapper title="Sign in">
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            variant="outlined"
            {...field("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              validate: (value) =>
                isValidEmailAddress(value) || "Email is not valid",
            })}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            {...field("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link style={{ textDecoration: "none" }} href="forgotPassword">
              Forgot password?
            </Link>

            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={isSubmitting}
            >
              {isSubmitting && <CircularProgress size={"sm"} />}
              Login
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 1,
            }}
          >
            <Typography sx={{ my: "auto" }}>New to our platform?</Typography>
            <Link style={{ textDecoration: "none" }} href="/signup">
              Create an account!
            </Link>
          </Box>

          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        </Stack>
      </form>
    </FormPageWrapper>
  );
}

//export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//  const user = await getUserFromSession(req);
//  if (user) {
//    return {
//      redirect: {
//        destination: "/",
//        permanent: false,
//      },
//    };
//  }
//
//  return {
//    props: {},
//  };
//};
