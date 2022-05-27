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
    const [login, setLogin] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [username, setUsername] = useState('');
    
    const logout = useCallback(
      async () => {
          cookies.remove('jwt')
          await setLogin(false);
          await setAdmin(true);
          await setUsername('');
          console.log(login, username, admin);
        },
        [login, username, admin]
       )

    const value = useMemo(
        () => ({
          login,
          admin,
          username,
          logout,
        }),
        [login, admin, username, logout]
      );
    
      const fetchData = useCallback(
        async () => {
          axios.post( 
            'http://localhost:4000/api/profile',
            bodyParameters,
            config
          )
          .then(async (res) => {
            setLogin(true);
            if(res.data.users) {
              await setAdmin(true);
            } else {
              await setAdmin(false);
            }
            await setUsername(res.data.displayName);
            console.log(login, username, admin);
          })
        }  
      )
    useEffect(() => {
      if(!login) {fetchData()} 
    },
    [login, admin, username, logout])

    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export const useLogin = () => useContext(LoginContext);