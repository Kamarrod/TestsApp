import { createContext, useState } from "react";
import React from "react";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const storedAuth = JSON.parse(localStorage.getItem("auth")) || {};
  const storedPersist = JSON.parse(localStorage.getItem("persist")) || false;

  const [auth, setAuth] = useState(storedAuth);
  const [persist, setPersist] = useState(storedPersist);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
