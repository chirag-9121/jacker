"use client";

// Global Context Provider Setup (Manages user state for deeply nested components)

import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // Calling API to check if user is authenticated and passing global user state accordingly
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/users/authCheck");
        setUser(res.data.data);
      } catch (err) {
        console.log("User not authenticated", err);
      } finally {
        setUserLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
