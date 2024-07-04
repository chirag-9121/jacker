"use client";

import { useRouter } from "next/navigation";
import axios from "axios"; // Used for making requests to server from browser
import LoginForm from "./LoginForm";
import { useState } from "react";

function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // Signup form submit handler function. Sends the user object to the server for processing.
  const loginHandler = async (e, user) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/login", user);
      if (response.status === 200) {
        router.refresh();
        router.push("/");
      }
    } catch (err) {
      setError(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm
      loginHandler={loginHandler}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default Login;
