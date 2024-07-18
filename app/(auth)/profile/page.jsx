"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { LoadingSpinner } from "@/app/components/ui/spinner";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

// ui components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { useUserContext } from "@/app/components/UserProvider";

function Profile() {
  const { user: authuser, userLoading } = useUserContext();
  const [validated, setValidated] = useState(true); // validating flag for the password and confirm password
  const [passwordType, setPasswordType] = useState("password"); // To show/hide password
  const [showPassword, setShowPassword] = useState(true); // To switch b/w open eye and closed eye
  const [isLoading, setIsLoading] = useState(false);
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
  return (
    <section className="flex w-full flex-col items-center p-7 pl-10">
      <p className="self-start text-2xl font-bold dark:text-white">Profile</p>

      <div className="flex h-full w-3/4 flex-col items-center gap-4">
        <div className="relative h-1/3 w-full rounded-b-lg bg-grey">
          {authuser ? (
            <Avatar className="absolute -bottom-9 left-14 h-20 w-20 border-8 border-lightbackground dark:border-darkbackground">
              <AvatarImage src="" alt="PFP" />

              <AvatarFallback className="dark:text-white">
                {authuser.fname[0]}
                {authuser.lname[0]}
              </AvatarFallback>
            </Avatar>
          ) : null}
        </div>

        <form
          className="flex h-full w-2/3 flex-col justify-between self-end pt-3"
          action=""
          // onSubmit={(e) => signupHandler(e, user)} // Callback to page component function
        >
          <div className="flex flex-col space-y-4 md:space-y-6">
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <label
                  htmlFor="first-name"
                  className="mb-2 block text-xs font-medium text-darkgrey"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="fname"
                  onChange={(e) => setUser({ ...user, fname: e.target.value })}
                  value={user.fname}
                  className="block w-full rounded-lg border-2 border-transparent bg-darkgrey/10 p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                  placeholder="John"
                  required={true}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="last-name"
                  className="mb-2 block text-xs font-medium text-darkgrey"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="lname"
                  onChange={(e) => setUser({ ...user, lname: e.target.value })}
                  value={user.lname}
                  className="block w-full rounded-lg border-2 border-transparent bg-darkgrey/10 p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                  placeholder="Doe"
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium text-darkgrey"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
                className="block w-full rounded-lg border-2 border-transparent bg-darkgrey/10 p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                placeholder="johndoe@gmail.com"
                required={true}
              />
            </div>

            <div className="flex justify-between gap-4">
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-medium text-darkgrey"
                >
                  New password
                </label>
                <div className="relative">
                  <input
                    type={passwordType}
                    name="password"
                    id="password"
                    onChange={onPasswordChange} // Start validating both password fields when user starts typing
                    value={user.password}
                    placeholder="••••••••"
                    className="block w-full rounded-lg border-2 border-transparent bg-darkgrey/10 p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
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
              <div className="w-full">
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-xs font-medium text-darkgrey"
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
                    className="block w-full rounded-lg border-2 border-transparent bg-darkgrey/10 p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
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
            </div>

            {!validated && (
              // will-change-transform is applied as the color of this p tag was changing based on whether the above input
              // fields are focused or not
              <p className="text-end text-sm font-semibold text-error will-change-transform">
                Passwords do not match
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-5">
            <input
              type="reset"
              value="Cancel"
              className="h-9 w-20 cursor-pointer rounded-lg bg-primary/20 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary-light/80"
            />
            <button
              type="submit"
              disabled={!validated && isLoading}
              className="h-9 w-20 rounded-lg bg-primary text-sm font-semibold text-white hover:bg-primary/80"
            >
              {/* Updating text in button based on isLoading value */}
              {!isLoading && "Save"}

              {isLoading && (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSpinner /> Saving...
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
