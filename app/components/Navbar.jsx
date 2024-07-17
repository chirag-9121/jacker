"use client";

import { useUserContext } from "./UserProvider";
import UserPfp from "./navbar/UserPfp";
import axios from "axios";

// next.js functions
import { useRouter } from "next/navigation";

// next.js components
import Link from "next/link";
import Image from "next/image";

// ui components
import { Skeleton } from "./ui/skeleton";

// public assets and icons
import Logo from "@/public/jacker-logo.png";

function Navbar() {
  // Extracting global context vars to dynamically update navbar on login/logout
  const { user, setUser, userLoading } = useUserContext();

  // Function to dynamically render the homepage link set on the logo
  const href = () => {
    return user ? "/job-tracker" : "/";
  };

  const router = useRouter();

  // Logout handler
  const logoutHandler = async () => {
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

  return (
    <nav className="flex h-9v justify-between bg-primary px-24 py-1.5">
      {/* Jacker Logo  */}
      <Link href={href()}>
        <Image
          src={Logo}
          alt="Jacker Logo"
          width={150}
          height={50}
          placeholder="blur"
          quality={100}
        />
      </Link>

      {/* To dynamically display skeleton/profile picture/login buttons  */}
      {userLoading ? (
        // Circle skeleton
        <div className="flex items-center justify-end gap-8">
          <Skeleton className="h-10 w-10 rounded-full bg-white/60 dark:bg-white/65" />
          <Skeleton className="h-10 w-10 rounded-full bg-white/60 dark:bg-white/65" />
        </div>
      ) : user ? (
        <UserPfp logoutHandler={logoutHandler} user={user} />
      ) : (
        // Login/sigup buttons
        <div className="flex items-center justify-end gap-5">
          <Link href="/signup">
            <button className="h-9 w-20 rounded-lg border border-primary-light text-sm font-semibold text-white hover:bg-primary-light hover:text-primary">
              Sign Up
            </button>
          </Link>
          <Link href="/login">
            <button className="h-9 w-20 rounded-lg bg-primary-light text-sm font-semibold text-primary hover:shadow-md hover:shadow-black/30">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
