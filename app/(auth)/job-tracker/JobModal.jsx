"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

// public assets and icons
import { IoCalendar } from "react-icons/io5";

// ui components
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import CrossButton from "@/app/components/ui/cross-button";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";

function JobModal({
  jobId,
  job,
  setJob,
  jobIsLoading,
  addJobHandler,
  editJobHandler,
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // To delay the popover calendar from closing

  // To clear form fields or job state on cancel
  const clearStateHandler = () => {
    setJob({
      jobTitle: "",
      company: "",
      jobUrl: "",
      applicationDate: new Date(),
      salary: undefined,
    });
  };

  return (
    <>
      <DialogHeader className="flex-row items-center justify-between">
        <DialogTitle>
          {/* If jobId is present, i.e. Modal is triggered by edit button, display Edit Job, else.. Add new job */}
          {jobId ? "Edit Job" : "Add a new Job"}
        </DialogTitle>
        <DialogDescription />
        <DialogTrigger>
          <CrossButton />
        </DialogTrigger>
      </DialogHeader>

      <form
        className="space-y-4 md:space-y-6"
        onSubmit={(e) =>
          jobId ? editJobHandler(e, jobId, job) : addJobHandler(e, job)
        }
      >
        <div>
          <label
            htmlFor="jobtitle"
            className="mb-2 block text-xs font-medium text-black dark:text-white"
          >
            Job Title <span className="text-sm text-error">*</span>
          </label>
          <input
            type="text"
            name="job-title"
            id="jobtitle"
            onChange={(e) => setJob({ ...job, jobTitle: e.target.value })}
            value={job.jobTitle}
            className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
            placeholder="CEO"
            required={true}
          />
        </div>

        <div>
          <label
            htmlFor="companyname"
            className="mb-2 block text-xs font-medium text-black dark:text-white"
          >
            Company Name <span className="text-sm text-error">*</span>
          </label>
          <input
            type="text"
            name="company-name"
            id="companyname"
            onChange={(e) => setJob({ ...job, company: e.target.value })}
            value={job.company}
            className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
            placeholder="Jacker"
            required={true}
          />
        </div>

        <div>
          <label
            htmlFor="joburl"
            className="mb-2 block text-xs font-medium text-black dark:text-white"
          >
            Job URL <span className="text-sm text-error">*</span>
          </label>
          <input
            type="text"
            name="job-url"
            id="joburl"
            onChange={(e) => setJob({ ...job, jobUrl: e.target.value })}
            value={job.jobUrl}
            className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
            placeholder="www.jacker.com"
            required={true}
          />
        </div>

        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="mb-2 block text-xs font-medium text-black dark:text-white">
              Application Date
              {/* text-sm gives a certain line height to element, input fields were not aligned properly */}
              <span style={{ lineHeight: 0 }} className="text-sm text-error">
                *
              </span>
            </label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "flex w-full justify-between rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70",
                    !job.applicationDate && "text-muted-foreground",
                  )}
                >
                  {job.applicationDate ? (
                    format(job.applicationDate, "PPyy")
                  ) : (
                    <span className="text-grey">February 30th, 2024</span>
                  )}
                  <IoCalendar className="h-4 w-4 text-iconblue" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={job.applicationDate}
                  onSelect={(e) => {
                    setJob({ ...job, applicationDate: e });
                    setTimeout(() => {
                      setIsCalendarOpen(false);
                    }, 200);
                  }}
                  toDate={new Date()} // disables all future dates
                  initialFocus
                  required="true"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full">
            <label
              htmlFor="salary"
              className="mb-2 block text-xs font-medium text-black dark:text-white"
            >
              Expected Salary
            </label>
            <input
              type="number"
              name="salary"
              id="salary"
              onChange={(e) => setJob({ ...job, salary: e.target.value })}
              value={job.salary}
              placeholder="672,000"
              className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
            />
          </div>
        </div>

        {/* Form action buttons */}
        <div className="flex items-center justify-end gap-5">
          <DialogTrigger>
            <div
              // Only clearing the form on cancel, when form is triggered by add job, and not edit button
              onClick={jobId ? null : clearStateHandler}
              className="flex h-9 w-20 cursor-pointer items-center justify-center rounded-lg bg-primary/20 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary-light/80"
            >
              Cancel
            </div>
          </DialogTrigger>
          <button
            type="submit"
            className="h-9 w-20 rounded-lg bg-primary text-sm font-semibold text-white hover:bg-primary/80"
          >
            {/* Updating text in button based on jobIsLoading value */}
            {/* If the jobId is present, i.e. Modal is triggered by edit button */}
            {!jobIsLoading && jobId && "Save"}
            {jobIsLoading && jobId && "Saving..."}

            {/* If the jobId is not present, i.e. Modal is triggered by add job button */}
            {!jobIsLoading && !jobId && "Add"}
            {jobIsLoading && !jobId && "Adding..."}
          </button>
        </div>
      </form>
    </>
  );
}

export default JobModal;
