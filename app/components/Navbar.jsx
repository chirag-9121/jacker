"use client";

import { useUserContext } from "./UserProvider";
import axios from "axios";

// next.js functions
import { useRouter } from "next/navigation";

// next.js components
import Link from "next/link";
import Image from "next/image";

// ui components
import ProfileIconLoading from "./loaders/ProfileIconLoading";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

// public assets and icons
import Logo from "@/public/jacker-logo.png";
import { Half2Icon } from "@radix-ui/react-icons";
import { LuUser2 } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";

function Navbar() {
  const { user, setUser, userLoading } = useUserContext();
  const href = () => {
    return user ? "/job-tracker" : "/";
  };

  const router = useRouter();
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

      {userLoading ? (
        <ProfileIconLoading />
      ) : user ? (
        <div className="flex items-center justify-end gap-10">
          <IoNotifications size={20} className="fill-white" />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="" alt="PFP" />
                <AvatarFallback className="dark:text-white">
                  {user.fname[0]}
                  {user.lname[0]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="p-3 font-semibold"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <DropdownMenuItem className="gap-2">
                <LuUser2 size={16} />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Half2Icon />
                Dark Theme
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logoutHandler} className="gap-2">
                <AiOutlineLogout size={16} />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
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
