"use client";

import { useUserContext } from "@/app/components/UserProvider";
import UserPfp from "./UserPfp";
import axios from "axios";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// next.js components
import Link from "next/link";
import Image from "next/image";

// ui components
import { Skeleton } from "@/app/components/ui/skeleton";

// public assets and icons
import Logo from "@/public/jacker-logo.png";

function Navbar() {
  // Extracting global context vars to dynamically update navbar on login/logout
  const { user, setUser, userLoading } = useUserContext();

  // Function to dynamically render the homepage link set on the logo
  const href = () => {
    return user ? "/job-tracker" : "/";
  };

  // Logout handler
  const logoutHandler = async () => {
    try {
      const response = await axios.post("/api/users/logout");
      if (response.status === 200) {
        setUser(null);
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="flex h-9v items-center justify-between bg-primary px-3 py-1.5 md:px-24">
      {/* Jacker Logo  */}
      <Link className="h-[4vh] w-auto md:h-[7vh]" href={href()}>
        <Image
          src={Logo}
          width="auto"
          height="auto"
          alt="Jacker Logo"
          placeholder="blur"
          quality={100}
          className="h-full w-full"
        />
      </Link>

      {userLoading ? (
        // Circle skeleton
        <div className="flex items-center justify-end gap-8">
          <Skeleton className="h-8 w-8 rounded-full bg-white/60 dark:bg-white/65" />
        </div>
      ) : (
        <>
          <SignedOut>
            <SignInButton asChild>
              <button className="h-7 w-16 rounded-lg border border-primary-light text-xs font-semibold text-white hover:bg-primary-light hover:text-primary md:h-9 md:w-20 md:text-sm">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </>
      )}

      {/* To dynamically display skeleton/profile picture/login buttons  */}

      {/* {userLoading ? (
        // Circle skeleton
        <div className="flex items-center justify-end gap-8">
          <Skeleton className="h-10 w-10 rounded-full bg-white/60 dark:bg-white/65" />
          <Skeleton className="h-10 w-10 rounded-full bg-white/60 dark:bg-white/65" />
        </div>
      ) : user ? (
        <div className="flex items-center justify-end gap-10">
          <UserPfp logoutHandler={logoutHandler} user={user} />
        </div>
      ) : (
        // Login/sigup buttons
        <div className="flex items-center justify-end gap-2 md:gap-5">
          <Link href="/signup">
            <button className="h-7 w-16 rounded-lg border border-primary-light text-xs font-semibold text-white hover:bg-primary-light hover:text-primary md:h-9 md:w-20 md:text-sm">
              Sign Up
            </button>
          </Link>
          <Link href="/login">
            <button className="h-7 w-16 rounded-lg bg-primary-light text-xs font-semibold text-primary hover:shadow-md hover:shadow-black/30 md:h-9 md:w-20 md:text-sm">
              Login
            </button>
          </Link>
        </div>
      )} */}
    </nav>
  );
}

export default Navbar;
