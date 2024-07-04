"use client";

import { useRouter } from "next/navigation";
import axios from "axios"; // Used for making requests to server from browser
import SignupForm from "./SignupForm";

function Signup() {
  const router = useRouter();

  // Signup form submit handler function. Sends the user object to the server for processing.
  const signupHandler = async (e, user) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signup", user);
      if (response.status === 200) {
        router.refresh();
        router.push("/");
      }
    } catch (err) {
      console.log("Signup", err);
    }
  };

  return <SignupForm signupHandler={signupHandler} />;
}

export default Signup;
