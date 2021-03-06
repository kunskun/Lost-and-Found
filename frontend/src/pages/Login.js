import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import { useLogin } from "../contexts/LoginContext";
import { useEffect } from "react";

function Login() {
  const {login} = useLogin()

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const card = (
    <React.Fragment>
      <CardContent sx={{justifyContent:"center", alignItems:"center", p: 2, bgcolor: '#efebe9'}}>
        <Typography variant="h5" color="text.secondary" gutterBottom sx={{textAlign: 'center'}}>
          Welcome to
        </Typography>
        <Typography variant="h3" component="div"  sx={{textAlign: 'center', mb: 10}}>
        Lost{bull}and{bull}Found
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent:"center", alignItems:"center", p: 2, bgcolor: '#efebe9'}}>
        <Button variant="outlined" href="https://riwch.com/api/login">
          Signin / Signup
        </Button>
      </CardActions>
    </React.Fragment>
  );

  useEffect(() => {
  },
  [login])

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ my: "15%", position: "absolute" }}
    >     
      <Box sx={{ width: '40%' }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </Grid>
  );
}

export default Login;
