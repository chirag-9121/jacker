import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/app/components/ui/dialog";
import CrossButton from "../ui/cross-button";
import { IoMdEye } from "react-icons/io";

function AddJobModal() {
  return (
    <DialogContent>
      <DialogHeader className="flex-row items-center justify-between">
        <DialogTitle>Add a new job</DialogTitle>
        <DialogClose asChild>
          <CrossButton />
        </DialogClose>
      </DialogHeader>

      <form className="space-y-4 md:space-y-6">
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
              Application Date <span className="text-sm text-error">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="application-date"
                id="application-date"
                placeholder="30/2/2024"
                className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
                required={true}
              />
              <IoMdEye
                size={20}
                className="absolute end-0 top-0 m-2.5 cursor-pointer dark:fill-white"
              />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="salary"
              className="mb-2 block text-xs font-medium text-black dark:text-white"
            >
              Expected Salary
            </label>
            <input
              type="text"
              name="salary"
              id="salary"
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
          <button
            type="reset"
            // onClick={cancelFormHandler}
            className="h-9 w-20 cursor-pointer rounded-lg bg-primary/20 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary-light/80"
          >
            Cancel
          </button>
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
