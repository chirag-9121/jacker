"use client";

// Global Context Provider Setup (Manages user state for deeply nested components)

import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Toaster } from "@/app/components/ui/sonner";
import { useRouter } from "next/navigation";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  // Calling API to check if user is authenticated and passing global user state accordingly
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retreiving user info from userAuthToken if it exists in browser
        const res = await axios.get("/api/users/authCheck");
        setUser(res.data.data);
      } catch (err) {
        // If token is expired, redirect to login page with a toast to display
        if (err.response.status === 401) {
          router.refresh();
          router.push("/login");
          toast.info("Your session has expired.", {
            description: "One session expire a day keeps the hackers away!",
            action: {
              label: "OK",
              onClick: () => toast.dismiss(),
            },
            duration: 10 * 1000, // 10 seconds
          });
        } else console.log("User not authenticated", err);
      } finally {
        setUserLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userLoading }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
}

export default UserProvider;
