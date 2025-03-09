"use client";

// Global Context Provider Setup (Manages user state for deeply nested components)

import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

function UserProvider({ children }) {
  const { isSignedIn } = useAuth();
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // Calling API to check if user is authenticated and passing global user state accordingly
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Retreiving user info from userAuthToken if it exists in browser
        const res = await axios.get("/api/users/authCheck");
        setUser(res.data.data);
      } catch (err) {
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [isSignedIn]);

  return (
    <UserContext.Provider value={{ user, setUser, userLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
