"use client";

import useJobManager from "@/app/hooks/useJobManager";
import axios from "axios";
import { useUserContext } from "@/app/components/UserProvider";
import { useEffect, useState, useRef } from "react";

// Data Table components
import { getColumns } from "./columns";
import { DataTable } from "./data-table";

// ui components
import { Toaster } from "@/app/components/ui/sonner";
import JobModal from "@/app/(auth)/job-tracker/JobModal";
import AddButton from "@/app/components/ui/add-button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/app/components/ui/dialog";

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
  } = useJobManager();

  const [jobs, setJobs] = useState([]); // Jobs state to render all jobs
  const hasPageBeenRendered = useRef(false); // To bypass initial run of useEffect causing flash
  const columns = getColumns(jobs, setJobs); // Calling the getColumns function that takes jobs and setJobs as param to update state of jobs, the returned array of column definitions is then passed in the data table component

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

  // Updating jobs state when new job is added and resetting form fields to null
  useEffect(() => {
    // Bypasses initial run
    if (hasPageBeenRendered.current) {
      setJobs((prevJobs) => [...prevJobs, job]);

      setJob({
        jobTitle: "",
        company: "",
        jobUrl: "",
        applicationDate: new Date(),
        salary: undefined,
      });
    }
    hasPageBeenRendered.current = true;
  }, [newJobAddedFlag]);

  // Retrieving jobs when user is loaded
  useEffect(() => {
    if (user) getJobs();
  }, [user]);

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
            <DialogContent>
              <JobModal
                job={job}
                setJob={setJob}
                jobIsLoading={jobIsLoading}
                addJobHandler={addJobHandler}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Job application Table */}
      {jobs && (
        <div className="mx-auto py-10">
          <DataTable columns={columns} data={jobs} />
        </div>
      )}

      {/* Sonner to display api related updates */}
      <Toaster richColors />
    </div>
  );
}

export default JobTracker;
