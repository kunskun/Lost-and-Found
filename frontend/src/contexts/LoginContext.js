import { useState } from "react";
import { createContext, useContext } from "react";
import { useMemo } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState(false);

    

    const value = useMemo(
        () => ({
          login,
        }),
        [login]
      );

    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export const useLogin = () => useContext(LoginContext);