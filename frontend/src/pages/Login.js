import * as React from "react";
import { Grid } from "@mui/material";
import { useLogin } from "../contexts/LoginContext";

function Login() {
  const {loginAsAdmin} = useLogin()

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ my: "15%", position: "absolute" }}
    >
      <h1>SIGNIN</h1>
      <button onClick={loginAsAdmin}>admin</button>
    </Grid>
  );
}

export default Login;
