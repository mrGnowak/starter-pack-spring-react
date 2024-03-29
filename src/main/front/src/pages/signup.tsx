import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useForm } from "react-hook-form";
import { Navigate, Router, useNavigate } from "react-router-dom";
import { FormPageWrapper } from "../material/FormPageWrapper";
import { isValidEmailAddress } from "../material/isValidEmailAddress";
import { fieldRegisterWrapper } from "../material/fieldRegisterWrapper";
import { feedbackUrlParam } from "../material/feedback";
import {
  passwordRegisterOptions,
  repeatedPasswordRegisterOptions,
} from "../auth/passwordRegisterOptions";

type FormData = {
  email: string;
  password: string;
  rpassword: string;
};

export default function Signup() {
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({});

  const onSubmit = handleSubmit(async (data) => {
    if (errorMsg) setErrorMsg("");

    const body = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        navigate(`/login?${feedbackUrlParam("account-created")}`);
      } else {
        throw new Error(await res.text());
      }
    } catch (error: any) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  });

  const field = fieldRegisterWrapper(register, errors);

  return (
    <FormPageWrapper title={"Sign up"}>
      <Box component="form" onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email address"
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
            type={passwordShown ? "text" : "password"}
            {...field("password", passwordRegisterOptions())}
            InputProps={{
              endAdornment: <VisibilityIcon onClick={togglePassword} />,
            }}
          />
          <TextField
            label="Repeat Password"
            variant="outlined"
            type={passwordShown ? "text" : "password"}
            {...field("rpassword", repeatedPasswordRegisterOptions())}
          />

          <Box sx={{ display: "flex" }}>
            <Link href="/login" sx={{ flex: 1 }}>
              I already have an account
            </Link>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting && <CircularProgress size={"sm"} />}
              Signup
            </Button>
          </Box>
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        </Stack>
      </Box>
    </FormPageWrapper>
  );
}

//export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//  const user = await getUserFromSession(req);
//  if (user) {
//    return {
//      redirect: {
//        destination: '/',
//        permanent: false,
//      },
//    };
//  }
//
//  return {
//    props: {},
//  };
//};
