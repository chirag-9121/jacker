"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/components/UserProvider";
import axios from "axios";

// ui components
import { UserAvatar } from "@/app/components/ui/user-avatar";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { Skeleton } from "@/app/components/ui/skeleton";

function Profile() {
  const { user: authuser, setUser, userLoading } = useUserContext(); // Global context user to display preloaded data in form
  const [isLoading, setIsLoading] = useState(false); // To change button text to Saving...
  const [error, setError] = useState();
  const router = useRouter();

  // Profile update form submit handler function. Sends the user object to the server for processing.
  const profileUpdateHandler = async (e, user) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/users/profile-update", user);
      if (response.status === 200) {
        console.log("success");
        // setUser(response.data.data);
        router.refresh();
      }
    } catch (err) {
      // setError(err.response.data.error);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex w-full flex-col items-center p-7 pl-10">
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
              user={authuser}
            />
          ) : null}
        </div>

        <ProfileUpdateForm
          authuser={authuser}
          isLoading={isLoading}
          error={error}
          profileUpdateHandler={profileUpdateHandler}
        />
      </div>
    </section>
  );
}

export default Profile;
