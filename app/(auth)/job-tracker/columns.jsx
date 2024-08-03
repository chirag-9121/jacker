"use client";

import { format } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Icons and ui components
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import EditResponse from "@/app/components/ui/edit-response";
import EditDeletePopup from "@/app/components/ui/edit-delete-popup";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";

import { IoCalendar } from "react-icons/io5";

function displayToastError() {
  toast.error("Oops! That didn't work", {
    action: {
      label: "OK",
      onClick: () => toast.dismiss(),
    },
  });
}

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
              className={`w-fit rounded-full ${classColor === "success" ? "bg-success/10 text-success" : classColor === "warning" ? "bg-warning/10 text-warning" : classColor === "error" ? "bg-error/10 text-error" : ""} p-2 px-4 text-xs`}
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
    cell: ({ row }) => {
      const followUpDate = row.getValue("followUpDate");
      const job = row.original;
      let colorToDisplay;
      let formatted;

      if (followUpDate) {
        formatted = format(followUpDate, "PPP");
        // Calculating the difference between followup date and application date to indicate the time since last follow up
        const daysDiff = Math.round(
          (new Date() - new Date(followUpDate)) / (24 * 60 * 60 * 1000),
        );
        console.log(daysDiff);
        if (daysDiff < 7) colorToDisplay = "text-success";
        else if (daysDiff < 14) colorToDisplay = "text-warning";
        else colorToDisplay = "text-error";
      }

      const followUpDateHandler = async (e) => {
        try {
          console.log(e);
          const response = axios.post("/api/jobs/edit-job/followup-date", {
            jobId: job._id,
            followUpDate: e,
          });
        } catch (err) {
          displayToastError();
        }
      };

      return (
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex w-3/4 items-center justify-between gap-1 rounded-lg border-2 border-transparent bg-forminput p-2 text-sm focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70",
                followUpDate && "text-muted-foreground",
              )}
            >
              <IoCalendar className="h-4 w-4 text-iconblue" />

              {followUpDate ? (
                <div className={colorToDisplay}>{formatted}</div>
              ) : (
                <span className="text-xs text-grey">Click to Add</span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={followUpDate}
              onSelect={(e) => {
                followUpDateHandler(e);
                setJobs((prevJobs) =>
                  prevJobs.map((j) =>
                    j._id === job._id ? { ...j, followUpDate: e } : j,
                  ),
                );
              }}
              fromDate={job.applicationDate}
              toDate={new Date()} // disables all future dates
              initialFocus
              required="true"
            />
          </PopoverContent>
        </Popover>
      );
    },
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
          displayToastError();
        }
      };

      return <EditDeletePopup deleteRowHandler={deleteJobHandler} />;
    },
  },
];
