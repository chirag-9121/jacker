"use client";

import { useRouter } from "next/navigation";
import axios from "axios"; // Used for making requests to server from browser
import SignupForm from "./SignupForm";
import { useState } from "react";

function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // Signup form submit handler function. Sends the user object to the server for processing.
  const signupHandler = async (e, user) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/signup", user);
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
    <SignupForm
      signupHandler={signupHandler}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default Signup;
