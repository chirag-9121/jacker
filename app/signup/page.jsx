"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // Used for making requests to server from browser
import Image from "next/image";
import openEye from "@/public/open-eye.png";
import closedEye from "@/public/closed-eye.png";

function Signup() {
  const router = useRouter();
  const [validated, setValidated] = useState(true); // validating flag for the passwords
  const [passwordType, setPasswordType] = useState("password");
  const [showPassword, setShowPassword] = useState(true);
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Toggle f:n between input type text and password
  const showPasswordToggler = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
    setShowPassword(!showPassword);
  };

  // function to check if password and confirm_password matches, sets validated flag accordingly
  const validatePassword = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "password":
        if (!value) break;
        else if (user.confirmPassword && value !== user.confirmPassword)
          setValidated(false);
        else if (user.confirmPassword && value === user.confirmPassword)
          setValidated(true);
        break;
      case "confirmPassword":
        if (!value) break;
        else if (user.password && value !== user.password) setValidated(false);
        else if (user.password && value === user.password) setValidated(true);
        break;
      default:
        break;
    }
  };

  // function to set password attributes of user object and then validate it
  const onPasswordChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    validatePassword(e);
  };

  // Signup form submit handler function. Sends the user object to the server for processing.
  const singupHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signup", user);
      if (response.status === 201) {
        router.refresh();
        router.push("/");
      }
    } catch (err) {
      console.log("Signup failed", err.message);
    }
  };

  return (
    <section className="h-91v">
      <div className="mx-auto flex h-full flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div className="w-full rounded-lg bg-white shadow-md sm:max-w-md md:mt-0 xl:p-0 dark:bg-cardcolor">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={singupHandler}>
              <div className="flex justify-between">
                <div>
                  <label
                    htmlFor="first-name"
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="fname"
                    onChange={(e) =>
                      setUser({ ...user, fname: e.target.value })
                    }
                    value={user.fname}
                    className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                    placeholder="John"
                    required="true"
                  />
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="lname"
                    onChange={(e) =>
                      setUser({ ...user, lname: e.target.value })
                    }
                    value={user.lname}
                    className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                    placeholder="Doe"
                    required="true"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user.email}
                  className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                  placeholder="johndoe@gmail.com"
                  required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordType}
                    name="password"
                    id="password"
                    onChange={onPasswordChange}
                    value={user.password}
                    placeholder="••••••••"
                    className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                    required="true"
                  />
                  <Image
                    className="absolute end-0 top-0 m-2.5 cursor-pointer"
                    style={{ display: showPassword ? "block" : "none" }}
                    onClick={showPasswordToggler}
                    src={openEye}
                    width={20}
                    height={20}
                  />

                  <Image
                    className="absolute end-0 top-0 m-2.5 cursor-pointer"
                    style={{ display: !showPassword ? "block" : "none" }}
                    onClick={showPasswordToggler}
                    src={closedEye}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={passwordType}
                    name="confirmPassword"
                    id="confirm-password"
                    onChange={onPasswordChange}
                    value={user.confirmPassword}
                    placeholder="••••••••"
                    className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                    required="true"
                  />
                  <Image
                    className="absolute end-0 top-0 m-2.5 cursor-pointer"
                    style={{ display: showPassword ? "block" : "none" }}
                    onClick={showPasswordToggler}
                    src={openEye}
                    width={20}
                    height={20}
                  />

                  <Image
                    className="absolute end-0 top-0 m-2.5 cursor-pointer"
                    style={{ display: !showPassword ? "block" : "none" }}
                    onClick={showPasswordToggler}
                    src={closedEye}
                    width={20}
                    height={20}
                  />
                </div>
                {!validated && (
                  // will-change-transform is applied as the color of this p tag was changing based on whether the above input
                  // fields are focused or not
                  <p className="text-error text-end text-sm font-semibold will-change-transform">
                    Passwords do not match
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!validated}
                className="w-full rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cardcolor focus:border focus:border-primary focus:outline-none dark:hover:bg-black/50 dark:focus:border-white"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline dark:text-primary-light/90"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js"
        defer
      ></script>
    </section>
  );
}

export default Signup;
