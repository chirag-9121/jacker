"use client";

import { useState } from "react";
import { useUserContext } from "@/app/components/UserProvider";
import axios from "axios";

import { Skeleton } from "@/app/components/ui/skeleton";

// shadcn ui components
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

function Analytics() {
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
    <section className="flex w-full flex-col gap-8 px-8 pt-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="mr-auto text-2xl font-bold dark:text-white">Analytics</p>

        <Tabs defaultValue="overview" className="mr-auto">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs defaultValue="overview" className="w-[400px]">
        <TabsContent value="overview"></TabsContent>
        <TabsContent value="advanced"></TabsContent>
      </Tabs>
    </section>
  );
}

export default Analytics;
