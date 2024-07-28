"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

// ui components
import { Toaster } from "@/app/components/ui/sonner";
import AddJobModal from "@/app/(auth)/job-tracker/AddJobModal";
import AddButton from "@/app/components/ui/add-button";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";

function JobTracker() {
  const [jobIsLoading, setJobIsLoading] = useState(false); // to update button text while job is being added
  const [open, setOpen] = useState(false); // To close dialog after job is added

  const [job, setJob] = useState({
    jobTitle: "",
    company: "",
    jobUrl: "",
    applicationDate: new Date(),
    salary: undefined,
  });

  const addJobHandler = async (e, job) => {
    e.preventDefault();
    setJobIsLoading(true);
    try {
      const response = await axios.post("/api/jobs/add-job", job);
      if (response.status === 200) {
        toast("Job application added", {
          action: {
            label: "OK",
            onClick: () => toast.dismiss(),
          },
        });
      }
    } catch (err) {
      toast.error("Oops! That didn't work", {
        action: {
          label: "OK",
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setJobIsLoading(false);
      setOpen(false);
      setJob({
        jobTitle: "",
        company: "",
        jobUrl: "",
        applicationDate: new Date(),
        salary: undefined,
      });
    }
  };
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
