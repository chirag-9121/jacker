"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../components/UserProvider";

function Logout() {
  const { setUser } = useUserContext();
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data.message);
      setUser(null);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    logout();
  }, []);
}

export default Logout;
