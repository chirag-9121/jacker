"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { format } from "date-fns";

// public assets and icons
import { IoCalendar } from "react-icons/io5";

// ui components
import {
  DialogContent,
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

function AddJobModal({ addJobHandler }) {
  const [date, setDate] = useState(new Date());
  const [job, setJob] = useState({
    jobTitle: "",
    companyName: "",
    jobUrl: "",
    applicationDate: date,
    salary: undefined,
  });

  return (
    <DialogContent>
      <DialogHeader className="flex-row items-center justify-between">
        <DialogTitle>Add a new job</DialogTitle>
        <DialogTrigger>
          <CrossButton />
        </DialogTrigger>
      </DialogHeader>

      <form
        className="space-y-4 md:space-y-6"
        onSubmit={(e) => addJobHandler(e, job)}
      >
        <div>
          <label
            htmlFor="job-title"
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
            htmlFor="company-name"
            className="mb-2 block text-xs font-medium text-black dark:text-white"
          >
            Company Name <span className="text-sm text-error">*</span>
          </label>
          <input
            type="text"
            name="company-name"
            id="companyname"
            onChange={(e) => setJob({ ...job, companyName: e.target.value })}
            value={job.companyName}
            className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
            placeholder="Jacker"
            required={true}
          />
        </div>

        <div>
          <label
            htmlFor="job-url"
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
            <label
              htmlFor="application-date"
              className="mb-2 block text-xs font-medium text-black dark:text-white"
            >
              Application Date{" "}
              {/* text-sm gives a certain line height to element, input fields were not aligned properly */}
              <span style={{ lineHeight: 0 }} className="text-sm text-error">
                *
              </span>
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "flex w-full justify-between rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70",
                    !date && "text-muted-foreground",
                  )}
                >
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span className="text-grey">February 30th, 2024</span>
                  )}
                  <IoCalendar className="h-4 w-4 text-iconblue" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  toDate={new Date()}
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
              placeholder="$672,000"
              className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
            />
          </div>
          {/* {!validated && (
            // will-change-transform is applied as the color of this p tag was changing based on whether the above input
            // fields are focused or not
            <p className="text-end text-sm font-semibold text-error will-change-transform">
              Passwords do not match
            </p>
          )} */}
        </div>

        {/* Form action buttons */}
        <div className="flex items-center justify-end gap-5">
          <DialogTrigger>
            <button
              type="reset"
              // onClick={cancelFormHandler}
              className="h-9 w-20 cursor-pointer rounded-lg bg-primary/20 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary-light/80"
            >
              Cancel
            </button>
          </DialogTrigger>
          <button
            type="submit"
            // disabled={!validated || isLoading}
            className="h-9 w-20 rounded-lg bg-primary text-sm font-semibold text-white hover:bg-primary/80"
          >
            {/* Updating text in button based on isLoading value */}
            Add
            {/* {!isLoading && "Save"} */}
            {/* {isLoading && "Saving..."} */}
          </button>
        </div>
      </form>
    </DialogContent>
  );
}

export default AddJobModal;
