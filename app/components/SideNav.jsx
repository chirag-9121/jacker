"use client";

import { useUserContext } from "./UserProvider";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// public assets and icons
import { FaBriefcase } from "react-icons/fa6";
import { MdAnalytics } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";

// ui components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Skeleton } from "@/app/components/ui/skeleton";

function SideNav() {
  const pathName = usePathname();
  const { user, userLoading } = useUserContext();

  return (
    <nav className="flex h-91v w-56 flex-col justify-between bg-white p-5 dark:bg-black">
      <div className="flex flex-col gap-5 pt-5">
        <div className="flex items-center gap-4">
          <FaBriefcase
            size={17}
            className={clsx("fill-grey", {
              "fill-primary": pathName === "/job-tracker",
            })}
          />
          <span
            className={clsx("font-semibold text-grey", {
              "text-primary": pathName === "/job-tracker",
            })}
          >
            Job Tracker
          </span>
        </div>

        {/* <div className="flex items-center gap-4">
          <MdAnalytics size={25} className="fill-grey" />
          <span className="text-grey font-semibold">Analytics</span>
        </div> */}

        <div className="flex items-center gap-4">
          <FaUserGroup
            size={17}
            className={clsx("fill-grey", {
              "fill-primary": pathName === "/contacts",
            })}
          />
          <span
            className={clsx("font-semibold text-grey", {
              "text-primary": pathName === "/contacts",
            })}
          >
            Contacts
          </span>
        </div>
      </div>

      {userLoading ? (
        <div className="flex items-center gap-3 pb-2">
          <Skeleton className="min-h-10 min-w-10 rounded-full" />
          <div className="w-full space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ) : user ? (
        <div className="flex items-center gap-3 pb-2">
          <Avatar>
            <AvatarImage src="" alt="PFP" />

            <AvatarFallback className="dark:text-white">
              {user.fname[0]}
              {user.lname[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex w-full flex-col justify-between">
            <div className="font-semibold dark:text-white">
              <span>
                {user.fname} {user.lname}
              </span>
            </div>
            <div className="text-grey">{user.email}</div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

export default SideNav;
