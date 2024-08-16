"use client";

// This custom hook is used to add a new job and edit job details

import axios from "axios";
import { useState } from "react";
import { displayToast } from "@/lib/utils";
import { useUserContext } from "@/app/components/UserProvider";
import { TOAST_ERROR_DESCR, TOAST_ERROR_MSG } from "@/lib/constants";

const useJobManager = () => {
  const [jobIsLoading, setJobIsLoading] = useState(false); // to update button text while job is being added/ edited
  const [open, setOpen] = useState(false); // To close dialog after job is added/ edited
  const { user, userLoading } = useUserContext();
  const [newJobAddedFlag, setNewJobAddedFlag] = useState(false); // Tracked by main page useEffect to update jobs list state whenever a new job is added
  const [jobUpdatedFlag, setJobUpdatedFlag] = useState(false); // Tracked by columns component useEffect to update jobs list state whenever a job is updated

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
      if (response.status === 200) {
        displayToast("Job application updated", "success");
        setJobUpdatedFlag((prev) => !prev);
        setOpen(false);
      }
    } catch (err) {
      displayToast(err.response.data.error, "error");
    } finally {
      setJobIsLoading(false);
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
          displayToast("Job application added");
          setNewJobAddedFlag((prev) => !prev);
          setOpen(false);
        }
      }
    } catch (err) {
      displayToast(err.response.data.error, "error");
    } finally {
      setJobIsLoading(false);
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
    jobUpdatedFlag,
  };
};

export default useJobManager;
