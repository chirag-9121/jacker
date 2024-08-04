"use client";

// This custom hook is used to add a new job and edit job details

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useUserContext } from "@/app/components/UserProvider";

// Function for displaying sonner
function displayToast(toastType, message) {
  if (toastType === "success") {
    toast(message, {
      action: {
        label: "OK",
        onClick: () => toast.dismiss(),
      },
    });
  } else {
    toast.error(message, {
      action: {
        label: "OK",
        onClick: () => toast.dismiss(),
      },
    });
  }
}

const useJobManager = () => {
  const [jobIsLoading, setJobIsLoading] = useState(false); // to update button text while job is being added/ edited
  const [open, setOpen] = useState(false); // To close dialog after job is added/ edited
  const { user, userLoading } = useUserContext();
  const [newJobAddedFlag, setNewJobAddedFlag] = useState(false); // Tracked by main page useEffect to update jobslist state whenever a new job is added

  // Initial state for adding a new job
  const [job, setJob] = useState({
    jobTitle: "",
    company: "",
    jobUrl: "",
    applicationDate: new Date(),
    salary: undefined,
  });

  // Edit job handler, Takes job id and job object as params
  const editJobHandler = async (e, jobId, job) => {
    e.preventDefault();
    setJobIsLoading(true);
    try {
      // Job id along with edited details is sent to backend for searching and updating
      const response = await axios.post("/api/jobs/edit-job", {
        jobId: jobId,
        job: job,
      });
      displayToast("success", "Job application updated");
    } catch (err) {
      displayToast("error", "Oops! That didn't work");
    } finally {
      setJobIsLoading(false);
      setOpen(false);
    }
  };

  // Add job handler, takes just the job object as param
  const addJobHandler = async (e, job) => {
    e.preventDefault();
    setJobIsLoading(true);
    try {
      if (!userLoading) {
        const response = await axios.post("/api/jobs/add-job", {
          userId: user.id,
          job: job,
        });

        // If new job is added successfully, update the job state which is used by main page to add job to joblist state
        if (response.status === 200) {
          setJob(response.data.savedJob);
          displayToast("success", "Job application added");
          setNewJobAddedFlag((prev) => !prev);
        }
      }
    } catch (err) {
      displayToast("error", "Oops! That didn't work");
    } finally {
      setJobIsLoading(false);
      setOpen(false);
    }
  };

  return {
    job,
    setJob,
    open,
    setOpen,
    jobIsLoading,
    addJobHandler,
    newJobAddedFlag,
    editJobHandler,
  };
};

export default useJobManager;
