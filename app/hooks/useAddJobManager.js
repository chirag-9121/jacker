"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useAddJobManager = () => {
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
      console.log(err);
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
  return { job, setJob, open, setOpen, jobIsLoading, addJobHandler };
};

export default useAddJobManager;
