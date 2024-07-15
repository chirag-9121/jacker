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
import { PersonIcon } from "@radix-ui/react-icons";
import { ExitIcon } from "@radix-ui/react-icons";

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
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.7071 6.79633C15.7071 8.05226 16.039 8.79253 16.7695 9.64559C17.3231 10.2741 17.5 11.0808 17.5 11.956C17.5 12.8302 17.2128 13.6601 16.6373 14.3339C15.884 15.1417 14.8215 15.6573 13.7372 15.747C12.1659 15.8809 10.5937 15.9937 9.0005 15.9937C7.40634 15.9937 5.83505 15.9263 4.26375 15.747C3.17846 15.6573 2.11602 15.1417 1.36367 14.3339C0.78822 13.6601 0.5 12.8302 0.5 11.956C0.5 11.0808 0.677901 10.2741 1.23049 9.64559C1.98384 8.79253 2.29392 8.05226 2.29392 6.79633V6.3703C2.29392 4.68834 2.71333 3.58852 3.577 2.51186C4.86106 0.941697 6.91935 0 8.95577 0H9.04522C11.1254 0 13.2502 0.987019 14.5125 2.62466C15.3314 3.67916 15.7071 4.73265 15.7071 6.3703V6.79633ZM6.07367 18.0608C6.07367 17.5573 6.53582 17.3266 6.96318 17.2279C7.46309 17.1222 10.5093 17.1222 11.0092 17.2279C11.4366 17.3266 11.8987 17.5573 11.8987 18.0608C11.8738 18.5402 11.5926 18.9653 11.204 19.2352C10.7001 19.628 10.1088 19.8767 9.49057 19.9664C9.14868 20.0107 8.81276 20.0117 8.48279 19.9664C7.86362 19.8767 7.27227 19.628 6.76938 19.2342C6.37978 18.9653 6.09852 18.5402 6.07367 18.0608Z"
              fill="white"
            />
          </svg>
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

            <DropdownMenuContent className="p-3 font-semibold">
              <DropdownMenuItem className="gap-2">
                <PersonIcon />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Half2Icon />
                Dark Theme
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logoutHandler} className="gap-2">
                <ExitIcon />
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
