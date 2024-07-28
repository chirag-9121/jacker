"use client";

import AddJobModal from "@/app/components/modals/AddJobModal";
import AddButton from "@/app/components/ui/add-button";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";
import axios from "axios";
import { useState } from "react";

function JobTracker() {
  const [jobIsLoading, setJobIsLoading] = useState(false); // to update button text while job is being added
  const [open, setOpen] = useState(false); // To close dialog after job is added and to clear previous form content

  const addJobHandler = async (e, job) => {
    e.preventDefault();
    setJobIsLoading(true);
    console.log(job);
    try {
      const response = await axios.post("/api/jobs/add-job", job);
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setJobIsLoading(false);
      setOpen(false);
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
              jobIsLoading={jobIsLoading}
              addJobHandler={addJobHandler}
              open={open}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default JobTracker;
