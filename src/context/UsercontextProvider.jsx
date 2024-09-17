import React, { useState } from "react";
import Usercontext from "./Usercontext";

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({ login: '' }); // Default to an empty login
  return (
    <Usercontext.Provider value={{ user, setUser }}>
      {children}
    </Usercontext.Provider>
  );
};

