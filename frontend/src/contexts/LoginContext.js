import { useState } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { useMemo, useCallback } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState(false);
    const [admin, setAdmin] = useState(true);

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

    },
    [login, admin])

    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export const useLogin = () => useContext(LoginContext);