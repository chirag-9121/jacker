"use client";

import { useUserContext } from "@/app/components/UserProvider";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

// public assets and icons
import { FaBriefcase } from "react-icons/fa6";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUserGroup } from "react-icons/fa6";

// ui components
import { Skeleton } from "@/app/components/ui/skeleton";
import { UserAvatar } from "@/app/components/ui/user-avatar";

function SideNav() {
  const pathName = usePathname();
  const { user, userLoading } = useUserContext();

  return (
    // Whole side nav
    <nav className="flex h-91v min-w-52 max-w-52 flex-col justify-between bg-white p-3 dark:bg-black">
      {/* Side Nav actions */}
      <div className="flex w-full flex-col gap-2 pt-4">
        <Link href="/analytics">
          <div
            className={clsx(
              "group flex items-center gap-4 rounded-md px-4 py-3",
              {
                "bg-primary/10 dark:bg-white/10": pathName === "/analytics",
              },
            )}
          >
            <TbLayoutDashboardFilled
              size={20}
              className={clsx("fill-grey group-hover:fill-primary", {
                "fill-primary": pathName === "/analytics",
              })}
            />
            <span
              className={clsx(
                "text-sm font-semibold text-grey group-hover:text-primary",
                {
                  "text-primary": pathName === "/analytics",
                },
              )}
            >
              Analytics
            </span>
          </div>
        </Link>

        <Link href="/job-tracker">
          <div
            className={clsx(
              "group flex items-center gap-4 rounded-md px-4 py-3",
              {
                "bg-primary/10 dark:bg-white/10": pathName === "/job-tracker",
              },
            )}
          >
            <FaBriefcase
              size={17}
              className={clsx("fill-grey group-hover:fill-primary", {
                "fill-primary": pathName === "/job-tracker",
              })}
            />
            <span
              className={clsx(
                "text-sm font-semibold text-grey group-hover:text-primary",
                {
                  "text-primary": pathName === "/job-tracker",
                },
              )}
            >
              Job Tracker
            </span>
          </div>
        </Link>

        <Link href="/contacts">
          <div
            className={clsx(
              "group flex items-center gap-4 rounded-md px-4 py-3",
              {
                "bg-primary/10 dark:bg-white/10": pathName === "/contacts",
              },
            )}
          >
            <FaUserGroup
              size={17}
              className={clsx("fill-grey group-hover:fill-primary", {
                "fill-primary": pathName === "/contacts",
              })}
            />
            <span
              className={clsx(
                "text-sm font-semibold text-grey group-hover:text-primary",
                {
                  "text-primary": pathName === "/contacts",
                },
              )}
            >
              Contacts
            </span>
          </div>
        </Link>
      </div>

      {/* User Profile Details Display */}
      {/* {userLoading ? (
        <div className="flex items-center gap-3 pb-2">
          <Skeleton className="min-h-10 min-w-10 rounded-full" />
          <div className="w-full space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ) : user ? (
        <div className="flex items-center gap-3 pb-2">
          <UserAvatar className="h-8 w-8 text-xs" name={user} />

          <div className="flex w-full flex-col flex-wrap justify-between">
            <div className="text-sm font-semibold dark:text-white">
              <span>
                {user.fname} {user.lname}
              </span>
            </div>
            <div className="break-all text-xs text-grey">{user.email}</div>
          </div>
        </div>
      ) : null} */}
    </nav>
  );
}

export default SideNav;
