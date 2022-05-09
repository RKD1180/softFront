import React, { createContext } from "react";

export const AuthContext = createContext();

const Authprovider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default Authprovider;
