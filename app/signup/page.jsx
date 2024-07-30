"use client";

import { useRouter } from "next/navigation";
import axios from "axios"; // Used for making requests to server from browser
import SignupForm from "./SignupForm";
import { useState } from "react";
import { useUserContext } from "../components/UserProvider";

function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { setUser } = useUserContext();

  // Signup form submit handler function. Sends the user object to the server for processing.
  const signupHandler = async (e, user) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/users/signup", user);
      if (response.status === 200) {
        setUser(response.data.savedUser);
        router.refresh();
        router.push("/job-tracker");
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
