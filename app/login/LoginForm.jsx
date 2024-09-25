"use client";

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/app/components/ui/spinner";

// Props coming from Login page component (isLoading is used to disable and update login button once the user clicks Login)
function LoginForm({ loginHandler, isLoading, error }) {
  const [passwordType, setPasswordType] = useState("password"); // To show/hide password
  const [showPassword, setShowPassword] = useState(true); // To switch b/w open eye and closed eye icon
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Toggle f:n between input type text and password
  const showPasswordToggler = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
    setShowPassword(!showPassword);
  };

  return (
    <section className="h-91v">
      <div className="mx-auto flex h-full flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div className="w-full rounded-lg bg-white shadow-md dark:bg-cardcolor sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black dark:text-white md:text-2xl">
              Sign in to your account
            </h1>

            {/* Errors from LoginForm displayed here on top */}
            {error && (
              <p className="rounded-lg bg-error/10 p-1 text-center text-sm font-semibold text-error">
                {error}
              </p>
            )}
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => loginHandler(e, user)} // Callback to page component function on submit
            >
              <div>
                {/* Email Input Field */}
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
                  required={true}
                />
              </div>
              <div>
                {/* Password Input Field */}
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
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    value={user.password}
                    placeholder="••••••••"
                    className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                    required={true}
                  />

                  <IoMdEye
                    size={20}
                    style={{ display: showPassword ? "block" : "none" }}
                    onClick={showPasswordToggler}
                    className="absolute end-0 top-0 m-2.5 cursor-pointer dark:fill-white"
                  />

                  <IoMdEyeOff
                    size={20}
                    style={{ display: !showPassword ? "block" : "none" }}
                    onClick={showPasswordToggler}
                    className="absolute end-0 top-0 m-2.5 cursor-pointer dark:fill-white"
                  />
                </div>
              </div>

              {/* Forgot Password */}
              {/* <div className="flex items-center justify-end">
                <Link
                  href="#"
                  className="text-sm font-medium text-primary hover:underline dark:text-primary-light"
                >
                  Forgot password?
                </Link>
              </div> */}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cardcolor focus:border focus:border-primary focus:outline-none dark:hover:bg-black/50 dark:focus:border-white"
              >
                {/* Updating text in button based on isLoading value */}
                {!isLoading && "Login"}{" "}
                {isLoading && (
                  <div className="flex items-center justify-center gap-2">
                    <LoadingSpinner className="stroke-white" /> Logging in...
                  </div>
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:underline dark:text-primary-light/90"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
