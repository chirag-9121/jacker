"use client";

import { format } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";

// Icons and ui components
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import EditResponse from "@/app/components/ui/edit-response";
import EditDeletePopup from "@/app/components/ui/edit-delete-popup";

import { IoCalendar } from "react-icons/io5";

// jobs and setJobs is taken as parameter from the main component to update the state of rendered jobs, this function returns an array of column definitions
export const getColumns = (jobs, setJobs) => [
  {
    accessorKey: "jobTitle",
    header: "Job Title",
  },
  {
    accessorKey: "company",
    header: "Company",
  },

  // JOB URL
  {
    accessorKey: "jobUrl",
    header: "Link to Job Advert",
    cell: ({ row }) => {
      const jobUrl = row.getValue("jobUrl");

      return (
        <Link href={`https://${jobUrl}`} className="text-primary">
          {jobUrl}
        </Link>
      );
    },
  },

  // EXPECTED SALARY
  {
    accessorKey: "salary",
    header: "Expected Salary",
    cell: ({ row }) => {
      const salary = parseFloat(row.getValue("salary"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(salary);

      return <div>{formatted}</div>;
    },
  },

  // APPLICATION DATE
  {
    accessorKey: "applicationDate",
    header: "Application Date",
    cell: ({ row }) => {
      // Getting the application date and formatting it as needed
      const applicationDate = new Date(row.getValue("applicationDate"));
      const formatted = format(applicationDate, "PPP");

      // Calculating the difference between today's date and application date to indicate the time since application
      const daysDiff = Math.round(
        (new Date() - applicationDate) / (24 * 60 * 60 * 1000),
      );
      let colorToDisplay;
      if (daysDiff < 7) colorToDisplay = "text-success";
      else if (daysDiff < 14) colorToDisplay = "text-warning";
      else colorToDisplay = "text-error";

      return (
        <div className="flex items-center gap-3">
          <IoCalendar className="text-iconblue" />
          <div className={colorToDisplay}>{formatted}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "response",
    header: "Response",
    cell: ({ row }) => {
      // Extracting the current response from row and its job id
      const response = row.getValue("response");
      const jobId = row.original._id;

      // Creating a map object to update tailwind class based on the value of response
      const responseToClassColorMap = {
        Positive: "success",
        Pending: "warning",
        Rejection: "error",
      };
      let classColor = responseToClassColorMap[response];

      // The response handler function makes a post request to backend to update response of a specific job
      const editResponseHandler = async (updatedResponse) => {
        try {
          // Sending job id and new response set by user
          const res = await axios.post("/api/jobs/edit-job/response", {
            jobId: jobId,
            updatedResponse: updatedResponse,
          });

          // If the update is successfull, update the classColor variable and job state
          if (res.status === 200) {
            classColor = responseToClassColorMap[updatedResponse];

            setJobs((prevJobs) =>
              prevJobs.map((job) =>
                job._id === jobId ? { ...job, response: updatedResponse } : job,
              ),
            );
          }
        } catch (err) {}
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`w-fit rounded-full bg-${classColor}/10 p-2 px-4 text-xs text-${classColor}`}
            >
              {response}
              <span className="sr-only">Job Response Actions</span>
            </button>
          </DropdownMenuTrigger>

          {/* UI component to select new response */}
          <EditResponse editResponseHandler={editResponseHandler} />
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "followUpDate",
    header: "Follow-up Date",
  },

  // ROW ACTIONS
  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;

      // Delete Job Application
      const deleteJobHandler = async () => {
        try {
          const response = await axios.post("/api/jobs/delete-job", {
            jobId: job._id,
          });
          if (response.status === 200) {
            // Once the job is deleted from backend, simply filtering it from the state
            setJobs((prevJobs) => prevJobs.filter((j) => j._id !== job._id));
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

      return <EditDeletePopup deleteJobHandler={deleteJobHandler} />;
    },
  },
];
