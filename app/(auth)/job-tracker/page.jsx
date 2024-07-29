"use client";

import useAddJobManager from "@/app/hooks/useAddJobManager";
import axios from "axios";
import useSWR from "swr";

// ui components
import { Toaster } from "@/app/components/ui/sonner";
import AddJobModal from "@/app/(auth)/job-tracker/AddJobModal";
import AddButton from "@/app/components/ui/add-button";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function JobTracker() {
  const { job, setJob, open, setOpen, jobIsLoading, addJobHandler } =
    useAddJobManager();
  // const { data, error, isLoading } = useSWR("/api/jobs/get-jobs", fetcher);
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

      {/* Sonner to display api related updates */}
      <Toaster richColors />
    </div>
  );
}

export default JobTracker;
