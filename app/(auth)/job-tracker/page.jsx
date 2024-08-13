"use client";

import useJobManager from "@/app/hooks/useJobManager";
import useJobColumnsManager from "@/app/hooks/useJobColumnsManager";
import axios from "axios";
import { useUserContext } from "@/app/components/UserProvider";
import { useEffect, useState, useRef, useMemo } from "react";

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
import SearchBox from "@/app/components/ui/search-box";
import { ScrollArea, ScrollBar } from "@/app/components/ui/scroll-area";

function JobTracker() {
  const [jobs, setJobs] = useState([]); // Jobs state to render all jobs
  const [jobsLoading, setJobsLoading] = useState(false); // To track the status of jobs (for displaying skeleton in data table)
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(""); // Defining the filterProps here to pass into search component and data table (This page acts as parent component to send this prop)
  const hasPageBeenRendered = useRef(false); // To bypass initial run of useEffect causing flash

  const { user, userLoading } = useUserContext();
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

  // Filter table props importing from JobColumnsManager hook to pass as params to getColumns
  const { setSelectedCompanies, setselectedResponses } =
    useJobColumnsManager(setColumnFilters);

  // Memoize columns to avoid recalculating on each render
  const columns = useMemo(
    () => getColumns(jobs, setJobs, setSelectedCompanies, setselectedResponses),
    [jobs],
  ); // Calling the getColumns function that takes jobs, setJobs and setColumnFilters as param to update state of jobs, the returned array of column definitions is then passed in the data table component
  const columnFilterProps = useMemo(
    () => ({ columnFilters, setColumnFilters }),
    [columnFilters],
  );
  const globalFilterProps = useMemo(
    () => ({ globalFilter, setGlobalFilter }),
    [globalFilter],
  ); // Making an object of globalFilterProps to send down to children

  // Getter function to retrieve jobs from backend
  const getJobs = async () => {
    setJobsLoading(true);
    try {
      const response = await axios.get("/api/jobs/get-jobs", {
        params: { userId: user.id }, // Passing user id to fetch all jobs added by current user
      });
      if (response.status === 200) {
        setJobs(response.data.jobs);
      }
    } catch (err) {
    } finally {
      setJobsLoading(false);
    }
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
    <div className="flex h-91v w-full flex-col gap-10 px-12 pt-7">
      {/* Header */}
      <div className="flex justify-between">
        <p className="self-center text-2xl font-bold dark:text-white">
          Job Tracker
        </p>

        {/* Search and Add Job */}
        <div className="flex gap-6">
          {/* Sending globalFilter and setGlobalFilter to search component */}
          <SearchBox globalFilterProps={globalFilterProps} />
          <div>
            {/* Initially open is false, i.e. modal is not open, when change is
          detected, open value set to true, and finally after handling the post
          request open is set to false again */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <AddButton>Add Job</AddButton>
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
      </div>

      {/* Job application Table */}
      <ScrollArea>
        <div className="mx-auto h-full w-full rounded-md pb-7 pr-1">
          <DataTable
            columns={columns}
            data={jobs}
            // To display the skeleton in data table when user and data are loading
            userLoading={userLoading}
            dataLoading={jobsLoading}
            columnFilterProps={columnFilterProps} // Sending columnFilters and setColumnFilters to data table component
            globalFilterProps={globalFilterProps} // Sending globalFilter and setGlobalFilter to data table component
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Sonner to display success msg, errors, info, etc. */}
      <Toaster richColors />
    </div>
  );
}

export default JobTracker;
