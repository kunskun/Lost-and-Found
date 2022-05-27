import { useState } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { useMemo, useCallback } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';

export const LoginContext = createContext();

const cookies = new Cookies();

const config = {
  headers: { Authorization: `Bearer ${cookies.get('jwt')}` }
};

const bodyParameters = {
 key: "value"
};

export const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState(true);
    const [admin, setAdmin] = useState(true);
    const [username, setUsername] = useState('');

    const loginAsAdmin = useCallback(
      async() => {
        await setAdmin(true)
        console.log("admin", admin);
      },
      [],
    );

    const loginAsUser = useCallback(
      async() => {
        await setAdmin(false)
        console.log("user", admin);
      },
      [],
    );
    
    const value = useMemo(
        () => ({
          login,
          admin,
          loginAsAdmin,
          loginAsUser,
        }),
        [login, admin, loginAsAdmin, loginAsUser]
      );
    
    useEffect(() => {
      // setUsername(async() => await Cookies.get('test'))
      console.log(cookies.get('jwt'));
      axios.post( 
        'http://localhost:4000/api/profile',
        bodyParameters,
        config
      )
      .then(res => {
        // const persons = res.data;
        console.log(res);
      })
    },
    [login, admin])

    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export const useLogin = () => useContext(LoginContext);