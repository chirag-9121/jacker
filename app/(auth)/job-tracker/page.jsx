"use client";

import useAddJobManager from "@/app/hooks/useAddJobManager";
import axios from "axios";
import { useUserContext } from "@/app/components/UserProvider";
import { useEffect, useState } from "react";

// Data Table components
import { columns } from "./columns";
import { DataTable } from "./data-table";

// ui components
import { Toaster } from "@/app/components/ui/sonner";
import AddJobModal from "@/app/(auth)/job-tracker/AddJobModal";
import AddButton from "@/app/components/ui/add-button";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";

function JobTracker() {
  const { user } = useUserContext();
  // Add job props importing from AddJobManager hook to pass to AddJobModal
  const {
    job,
    setJob,
    open,
    setOpen,
    jobIsLoading,
    addJobHandler,
    newJobAddedFlag,
  } = useAddJobManager();

  const [jobs, setJobs] = useState(); // Jobs state to render all jobs

  // Getter function to retrieve jobs from backend
  const getJobs = async () => {
    try {
      const response = await axios.get("/api/jobs/get-jobs", {
        params: { userId: user.id }, // Passing user id to fetch all jobs added by current user
      });
      if (response.status === 200) {
        setJobs(response.data.jobs);
      }
    } catch (err) {}
  };

  // Retrieving jobs when user is loaded and when new job is added
  useEffect(() => {
    if (user) getJobs();
  }, [user, newJobAddedFlag]);

  return (
    <div className="w-full p-7 pl-12 pr-12">
      {/* Header */}
      <div className="flex justify-between">
        <p className="self-center text-2xl font-bold dark:text-white">
          Job Tracker
        </p>
        {/* Search and Add Job */}
        <div>
          {/* Initially open is false, i.e. modal is not open, when change is
          detected, open value set to true, and finally after handling the post
          request open is set to false again */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <AddButton btnText=" Job" />
            </DialogTrigger>
            <AddJobModal
              job={job}
              setJob={setJob}
              jobIsLoading={jobIsLoading}
              addJobHandler={addJobHandler}
            />
          </Dialog>
        </div>
      </div>

      {/* Job application Table */}
      {jobs && (
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={jobs} />
        </div>
      )}

      {/* Sonner to display api related updates */}
      <Toaster richColors />
    </div>
  );
}

export default JobTracker;
