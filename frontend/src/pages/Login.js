import * as React from "react";
import { Grid } from "@mui/material";
import { useLogin } from "../contexts/LoginContext";
import { useEffect } from "react";

function Login() {
  const {loginAsAdmin, loginAsUser} = useLogin()

  useEffect(() => {
    
  },
  [loginAsUser])

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ my: "15%", position: "absolute" }}
    >
      <h1>SIGNIN</h1>
      <button onClick={() => loginAsAdmin()}>admin</button>
      <button onClick={() => loginAsUser()}>user</button>
    </Grid>
  );
}

export default Login;
