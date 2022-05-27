import * as React from "react";
import { Grid } from "@mui/material";
import { useLogin } from "../contexts/LoginContext";
import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import axios from 'axios';
import { useState } from "react";

const USERS_QUERY = gql`
  {
    users{
      googleId
    }
  }
`;

function Login() {
  const {loginAsAdmin, loginAsUser} = useLogin()
  const { data, loading, error } = useQuery(USERS_QUERY);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:4000/login`)
      .then(res => {
        const persons = res.data;
        setUser({ persons });
      })
  },
  [loginAsUser])

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
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
