import * as React from "react";
import { Grid } from "@mui/material";
import { useLogin } from "../contexts/LoginContext";
import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import axios from 'axios';
import { useState } from "react";

const config = {
  headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhlMTk5ZjU4ZDZhNThhMzU2OGI5YWYiLCJnb29nbGVJZCI6IjExNTUyNTE5NzQ4Njg5MzM5MTU4NSIsIl9fdiI6MCwiaWF0IjoxNjUzNjQ2MDUwLCJleHAiOjE2NTQyNTA4NTB9.igEgGhFq4Q-wv2qo-Pq7BIrEK7zcRX3j0IrgwzADYpY` }
};

const bodyParameters = {
 key: "value"
};


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
  },
  [loginAsUser])

  // if (loading) return "Loading...";
  // if (error) return <pre>{error.message}</pre>
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ my: "15%", position: "absolute" }}
    >
      <h1>SIGNIN</h1>
      <button onClick={() => {
        axios.get(`http://localhost:4000/api/login`)
        .then(res => {
          const persons = res.data;
          setUser({ persons });
        })
      }}>login</button>
      <button onClick={() => {
        axios.post( 
          'http://localhost:4000/api/kuy',
          bodyParameters,
          config
        )
        .then(res => {
          // const persons = res.data;
          console.log(res);
        })
      }}>logout</button>
    </Grid>
  );
}

export default Login;
