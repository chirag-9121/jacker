"use client";

import { format } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import { cn } from "@/lib/utils";

// Icons and ui components
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import EditResponse from "@/app/components/ui/edit-response";
import DataTableRowActions from "@/app/(auth)/job-tracker/DataTableRowActions";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "@/app/components/ui/button";
import { MultiSelect } from "@/app/components/ui/multi-select";

import { IoCalendar } from "react-icons/io5";
import { LuChevronsUpDown } from "react-icons/lu";

function displayToastError() {
  toast.error("Oops! That didn't work", {
    action: {
      label: "OK",
      onClick: () => toast.dismiss(),
    },
  });
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}

// jobs and setJobs is taken as parameter from the main component to update the state of rendered jobs, this function returns an array of column definitions
export const getColumns = (
  jobs,
  setJobs,
  setSelectedCompanies,
  setselectedResponses,
) => [
  {
    accessorKey: "jobTitle",
    header: "Job Title",
  },
  {
    accessorKey: "company",
    header: () => {
      // Extracting unique values of the company column to send in the multi-select component as all options
      const uniqueCompanies = [
        ...new Set(jobs.map((job) => job.company.toLowerCase())),
      ];

      return (
        <MultiSelect
          options={uniqueCompanies}
          // selectedCompanies is updated whenever any checkbox is checked or unchecked, which in turn triggers the useEffect and column filters are updated
          onValueChange={setSelectedCompanies}
          placeholder="Company"
        />
      );
    },
    // Custom filter function for company column as the filterValue is not a string now, but an array containing multiple strings
    filterFn: (row, columnId, filterValue) => {
      return (
        filterValue.length === 0 ||
        filterValue.includes(row.getValue(columnId).toLowerCase())
      );
    },
  },

  // JOB URL
  {
    accessorKey: "jobUrl",
    header: "Link to Job Advert",
    cell: ({ row }) => {
      const jobUrl = row.getValue("jobUrl");

      return (
        <Link href={jobUrl} className="text-primary">
          {truncateText(jobUrl, 40)}
        </Link>
      );
    },
  },

  // APPLICATION DATE
  {
    accessorKey: "applicationDate",
    // Making the header return a button to sort asc and desc
    header: ({ column }) => {
      return (
        <Button
          className="p-0 text-xs"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Application Date
          <LuChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // Getting the application date and formatting it as needed
      const applicationDate = new Date(row.getValue("applicationDate"));
      const formatted = format(applicationDate, "PPyy");

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

  // EXPECTED SALARY
  {
    accessorKey: "salary",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 text-xs"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expected Salary
          <LuChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    // header: "Expected Salary",
    cell: ({ row }) => {
      const salary = parseFloat(row.getValue("salary"));
      const formatted = new Intl.NumberFormat("en-US").format(salary);

      return <div>{salary ? formatted : null}</div>;
    },
  },

  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "response",
    header: () => {
      const uniqueResponses = ["Positive", "Pending", "Rejection"];

      return (
        <MultiSelect
          options={uniqueResponses}
          onValueChange={setselectedResponses}
          placeholder="Response"
          addSearchBar={false}
        />
      );
    },
    filterFn: (row, columnId, filterValue) => {
      return (
        filterValue.length === 0 || filterValue.includes(row.getValue(columnId))
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          className="p-0 text-xs"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Follow-up Date
          <LuChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // Extracting follow up date and the job object
      const followUpDate = row.getValue("followUpDate");
      const job = row.original;
      let colorToDisplay;
      let formatted;

      // If there is a date, format it and caclculate the time since last follow up to update tailwind class
      if (followUpDate) {
        formatted = format(followUpDate, "PPyy");
        // Calculating the difference between today's date and follow-up date to indicate the time since last follow up
        const daysDiff = Math.round(
          (new Date() - new Date(followUpDate)) / (24 * 60 * 60 * 1000),
        );
        if (daysDiff < 7) colorToDisplay = "text-success";
        else if (daysDiff < 14) colorToDisplay = "text-warning";
        else colorToDisplay = "text-error";
      }

      // Sending post request to update follow-up date
      const followUpDateHandler = async (e) => {
        try {
          const response = axios.post("/api/jobs/edit-job/followup-date", {
            jobId: job._id,
            followUpDate: e,
          });
        } catch (err) {
          displayToastError();
        }
      };

      // Returning an editable calendar popover triggered by a button as the cell data
      return (
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex items-center justify-between gap-1.5 rounded-lg border-2 border-transparent bg-forminput p-2 text-sm focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70",
                followUpDate && "text-muted-foreground",
              )}
            >
              <IoCalendar className="text-iconblue" />

              {/* If the followUpDate exists, format it and apply color */}
              {followUpDate ? (
                <div className={`text-xs ${colorToDisplay}`}>{formatted}</div>
              ) : (
                <span className="text-xs text-grey">Click to Add</span>
              )}
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={followUpDate}
              // When the date is selected, call the post request and send the update date (e) as param and update the job state
              onSelect={(e) => {
                followUpDateHandler(e);
                setJobs((prevJobs) =>
                  prevJobs.map((j) =>
                    j._id === job._id ? { ...j, followUpDate: e } : j,
                  ),
                );
              }}
              fromDate={job.applicationDate} // disables all dates before the application date on the calendar popover
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
      const jobRow = row.original;

      // Returning a component which handles edit and delete row functionality with all necessary states
      return <DataTableRowActions row={jobRow} setJobs={setJobs} />;
    },
  },
];
