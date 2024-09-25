"use client";

import { useUserContext } from "@/app/components/UserProvider";
import UserPfp from "./UserPfp";
import axios from "axios";

// next.js functions
import { useRouter } from "next/navigation";

// next.js components
import Link from "next/link";
import Image from "next/image";

// ui components
import { Skeleton } from "@/app/components/ui/skeleton";

// public assets and icons
import Logo from "@/public/jacker-logo.png";
import { IoNotifications } from "react-icons/io5";

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
      const response = await axios.post("/api/users/logout");
      if (response.status === 200) {
        setUser(null);
        router.push("/");
        // router.reload();
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="flex h-9v justify-between bg-primary px-24 py-1.5">
      {/* Jacker Logo  */}
      <Link className="h-[7vh] w-auto" href={href()}>
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

      {/* To dynamically display skeleton/profile picture/login buttons  */}
      {userLoading ? (
        // Circle skeleton
        <div className="flex items-center justify-end gap-8">
          <Skeleton className="h-10 w-10 rounded-full bg-white/60 dark:bg-white/65" />
          <Skeleton className="h-10 w-10 rounded-full bg-white/60 dark:bg-white/65" />
        </div>
      ) : user ? (
        <div className="flex items-center justify-end gap-10">
          {/* Notification icon */}
          {/* <IoNotifications size={20} className="fill-white" /> */}
          <UserPfp logoutHandler={logoutHandler} user={user} />
        </div>
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
