"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useUserContext } from "@/app/components/UserProvider";

const useAddJobManager = () => {
  const [jobIsLoading, setJobIsLoading] = useState(false); // to update button text while job is being added
  const [open, setOpen] = useState(false); // To close dialog after job is added
  const { user, userLoading } = useUserContext();
  const [newJobAddedFlag, setNewJobAddedFlag] = useState(false);

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
      if (!userLoading) {
        const response = await axios.post("/api/jobs/add-job", {
          userId: user.id,
          job: job,
        });

        if (response.status === 200) {
          setJob(response.data.savedJob);
          setNewJobAddedFlag((prev) => !prev);
          toast("Job application added", {
            action: {
              label: "OK",
              onClick: () => toast.dismiss(),
            },
          });
        }
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
  };
};

export default useAddJobManager;
