"use client";

import AddJobModal from "@/app/components/modals/AddJobModal";
import AddButton from "@/app/components/ui/add-button";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";
import axios from "axios";

function JobTracker() {
  const addJobHandler = async (e, job) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/jobs/add-job", job);
      if (response.status === 200) {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
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
          <Dialog>
            <DialogTrigger>
              <AddButton btnText=" Job" />
            </DialogTrigger>
            <AddJobModal addJobHandler={addJobHandler} />
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default JobTracker;
