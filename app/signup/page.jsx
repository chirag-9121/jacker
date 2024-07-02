"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // Used for making requests to server from browser

function Signup() {
  const router = useRouter();
  const [confirm_password, setConfirmPassword] = useState("");
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

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
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  value={user.password}
                  placeholder="••••••••"
                  className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                  required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirm_password}
                  placeholder="••••••••"
                  className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                  required="true"
                />
                {!(user.password === confirm_password) && (
                  // will-change-transform is applied as the color of this p tag was changing based on whether the above input
                  // fields are focused or not
                  <p className="text-error text-end text-sm font-semibold will-change-transform">
                    Passwords do not match
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={user.password !== confirm_password}
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
    </section>
  );
}

export default Signup;
