import EditDeletePopup from "@/app/components/ui/edit-delete-popup";
import useJobManager from "@/app/hooks/useJobManager"; // Custom hook that returns props to handle edit job functionality
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";

function DataTableRowActions({ row, setJobs }) {
  // ***Edit Job Application***
  const hasPageBeenRendered = useRef(false); // To bypass initial run of useEffect causing flash

  // Creating an initial state consisting of current job details to be passed into edit job modal form
  const [job, setJob] = useState({
    jobTitle: row.jobTitle,
    company: row.company,
    jobUrl: row.jobUrl,
    applicationDate: row.applicationDate,
    salary: row.salary ? row.salary : undefined,
  });

  // Destructuring necessary props from custom hook
  const { open, setOpen, jobIsLoading, editJobHandler, jobUpdatedFlag } =
    useJobManager();

  // Creating a prop object that consists all neccessary props to handle edit job functionality
  const editJobProps = {
    jobId: row._id,
    job,
    setJob,
    open,
    setOpen,
    jobIsLoading,
    editJobHandler,
  };

  // Updating jobs state when a job update is successful
  useEffect(() => {
    // Bypasses initial run
    if (hasPageBeenRendered.current) {
      // If the mapped id and current row id is same: edit the job object by updating every property that is set in the edit form,
      // else return the the whole row as it is
      // ...j = {contact, response, follow-up date} (Everything that is not in the edit form)
      // ...job = {jobTitle, company, jobUrl...} (The job state which is created above and passed to the form)
      // This job state is not returned from the post response, the values are simply used which are set by the setJob in edit form
      // No, this doesn't mean that job row can be updated without post request, this useEffect only runs when jobUpdated flag is changed when the post request is successful
      setJobs((prevJobs) =>
        prevJobs.map((j) => (j._id === row._id ? { ...j, ...job } : j)),
      );
    }
    hasPageBeenRendered.current = true;
  }, [jobUpdatedFlag]);

  // ***Delete Job Application***
  const deleteJobHandler = async () => {
    try {
      const response = await axios.post("/api/jobs/delete-job", {
        jobId: row._id,
      });
      if (response.status === 200) {
        // Once the job is deleted from backend, simply filtering it from the state
        setJobs((prevJobs) => prevJobs.filter((j) => j._id !== row._id));
        toast("Job application deleted", {
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
    }
  };

  return (
    // UI component consisting of edit and delete button
    <EditDeletePopup
      editRowProps={editJobProps}
      deleteRowHandler={deleteJobHandler}
    />
  );
}

export default DataTableRowActions;
