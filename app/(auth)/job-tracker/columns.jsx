import { format } from "date-fns";
import Link from "next/link";
import axios from "axios";
import { cn } from "@/lib/utils";
import { displayToast } from "@/lib/utils";
import { TOAST_ERROR_MSG, TOAST_ERROR_DESCR } from "@/lib/constants";

// ui components
import EditResponse from "@/app/components/ui/edit-response";
import LinkContactSheet from "./LinkContactSheet";
import DataTableRowActions from "@/app/(auth)/job-tracker/DataTableRowActions";
import { MultiSelect } from "@/app/components/ui/multi-select";
import { UserAvatar } from "@/app/components/ui/user-avatar";

// ShadCn ui components
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Sheet, SheetTrigger, SheetContent } from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";

// icons
import { IoCalendar } from "react-icons/io5";
import { LuChevronsUpDown } from "react-icons/lu";

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
  contacts,
  setContacts,
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
      ].sort();

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
        <Link
          href={jobUrl}
          className="break-all text-primary dark:text-[#9990FF]"
        >
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
    cell: ({ row }) => {
      const contact = row.getValue("contact");
      const jobId = row.original._id;

      // Unlink contact from job handler
      const unlinkContactHandler = async () => {
        try {
          const response = await axios.delete(
            "/api/jobs/edit-job/link-contact",
            {
              data: { jobId: jobId },
            },
          );
          if (response.status === 200) {
            setJobs((prevJobs) =>
              prevJobs.map((job) =>
                job._id === jobId
                  ? {
                      ...job,
                      contact: null,
                    }
                  : job,
              ),
            );
          }
        } catch (err) {
          displayToast(TOAST_ERROR_MSG, "error");
        }
      };

      // Link contact to job handler
      const linkContactHandler = async (contact) => {
        try {
          const response = await axios.post("/api/jobs/edit-job/link-contact", {
            jobId: jobId,
            contactId: contact._id,
          });

          // If new job is added successfully, update the job state which is used by main page to add job to joblist state
          if (response.status === 200) {
            setJobs((prevJobs) =>
              prevJobs.map((job) =>
                job._id === jobId
                  ? {
                      ...job,
                      // Setting the contact subdocument of job to match the projected contacts fetched from api to avoid discrepancy
                      contact: {
                        _id: contact._id,
                        fullName: contact.fullName,
                        company: contact.company,
                        email: contact.email,
                        phoneNumber: {
                          // Whether the contact is linked from existing (will contain the phoneNumber subdoc) or by creating a new contact
                          countryIso2: contact.phoneNumber
                            ? contact.phoneNumber.countryIso2
                            : contact.countryIso2,
                          number: contact.phoneNumber
                            ? contact.phoneNumber.number
                            : contact.number,
                        },
                      },
                    }
                  : job,
              ),
            );
          }
        } catch (err) {
          displayToast(TOAST_ERROR_MSG, "error");
        }
      };

      // To handle add new contact and link to job
      // First links the new contact to the current job by sending contact object recieved from add contact handler in custom hook
      // Then updates the contacts list to add the new contact to display in CommandGroup
      const addAndLinkContactHandler = async (contact) => {
        linkContactHandler(contact);
        setContacts((prev) => [...prev, contact]);
      };

      return (
        // Link contact form sheet
        <Sheet className="flex flex-col gap-10">
          <SheetTrigger asChild>
            {contact ? (
              <Button className="flex gap-2 bg-transparent p-2 text-black shadow-none hover:bg-black/10 dark:bg-transparent dark:shadow-none dark:hover:bg-white/10">
                <UserAvatar
                  className="h-6 w-6 text-xs"
                  avatarFallbackClassName="text-white bg-slate-800 dark:text-black dark:bg-primary-light"
                  name={{
                    fname: contact.fullName.split(" ")[0],
                    lname: contact.fullName.split(" ")[1],
                  }}
                />

                <div className="text-xs font-semibold dark:text-white">
                  <span>{contact.fullName}</span>
                </div>
              </Button>
            ) : (
              <Button className="h-8 w-12 bg-cardcolor dark:bg-white/90">
                Add
              </Button>
            )}
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-5 rounded-s-md border-none">
            {/* Link Contact Sheet component */}
            <LinkContactSheet
              contacts={contacts}
              linkContactHandler={linkContactHandler}
              unlinkContactHandler={unlinkContactHandler}
              linkedContact={contact}
              jobId={jobId}
              addAndLinkContactHandler={addAndLinkContactHandler}
            />
          </SheetContent>
        </Sheet>
      );
    },
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
              className={`w-fit rounded-full ${classColor === "success" ? "border border-success bg-success/10 text-success" : classColor === "warning" ? "border border-warning bg-warning/10 text-warning" : classColor === "error" ? "border border-error bg-error/10 text-error" : ""} p-2 px-4 text-xs`}
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
          displayToast(TOAST_ERROR_MSG, "error", TOAST_ERROR_DESCR);
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
                <span className="text-xs dark:text-forminput">
                  Click to Add
                </span>
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
