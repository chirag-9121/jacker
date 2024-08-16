"use client";

import { useState } from "react";
import { useUserContext } from "@/app/components/UserProvider";
import axios from "axios";

// ui components
import { UserAvatar } from "@/app/components/ui/user-avatar";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Toaster } from "@/app/components/ui/sonner";
import { displayToast } from "@/lib/utils";
import { TOAST_ERROR_DESCR } from "@/lib/constants";

function Profile() {
  const { user: authuser, setUser, userLoading } = useUserContext(); // Global context user to display preloaded data in form
  const [isLoading, setIsLoading] = useState(false); // To change button text to Saving...

  // Profile update form submit handler function. Sends the user object to the server for processing.
  const profileUpdateHandler = async (e, user) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/users/profile-update", user);
      if (response.status === 200) {
        // Update global context user and display success sonner
        setUser(response.data.data);
        displayToast("Profile Updated", "success");
      }
    } catch (err) {
      // Displaying error sonner
      displayToast("Profile Updated Failed", "error", TOAST_ERROR_DESCR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex w-full flex-col items-center p-7 pl-12">
      <p className="self-start text-2xl font-bold dark:text-white">Profile</p>

      {/* Profile banner and avatar */}
      <div className="flex h-full w-3/4 flex-col items-center gap-4">
        <div className="relative h-1/3 w-full rounded-b-lg bg-grey">
          {userLoading ? (
            <div className="absolute -bottom-9 left-14 h-20 w-20 rounded-full bg-lightbackground dark:bg-darkbackground">
              <Skeleton className="h-20 w-20 rounded-full bg-white/60 dark:bg-white/65" />
            </div>
          ) : authuser ? (
            <UserAvatar
              className="absolute -bottom-9 left-14 h-20 w-20 border-8 border-lightbackground dark:border-darkbackground"
              name={authuser}
            />
          ) : null}
        </div>

        {/* The update form component */}
        <ProfileUpdateForm
          authuser={authuser}
          isLoading={isLoading}
          profileUpdateHandler={profileUpdateHandler}
        />
      </div>

      {/* Sonner to display success msg, errors, info, etc. */}
      <Toaster richColors />
    </section>
  );
}

export default Profile;
