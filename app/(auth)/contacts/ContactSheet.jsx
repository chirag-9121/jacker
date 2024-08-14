import CrossButton from "@/app/components/ui/cross-button";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

// Shadcn ui components
import {
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";

function ContactSheet() {
  return (
    <>
      <SheetHeader className="flex-row items-center justify-between">
        <SheetTitle>Add Contact</SheetTitle>
        <SheetTrigger>
          <CrossButton />
        </SheetTrigger>
      </SheetHeader>

      <form
        className="flex h-full flex-col justify-between space-y-4 md:space-y-6"
        // onSubmit={(e) =>
        //   jobId ? editJobHandler(e, jobId, job) : addJobHandler(e, job)
        // }
      >
        <div className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-xs font-medium text-black dark:text-white"
            >
              Full Name <span className="text-sm text-error">*</span>
            </label>
            <input
              type="text"
              name="full-name"
              id="fullName"
              // onChange={(e) => setJob({ ...job, jobTitle: e.target.value })}
              // value={job.jobTitle}
              className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
              placeholder="Jane Doe"
              required={true}
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="mb-2 block text-xs font-medium text-black dark:text-white"
            >
              Company <span className="text-sm text-error">*</span>
            </label>
            <input
              type="text"
              name="company"
              id="company"
              // onChange={(e) => setJob({ ...job, jobTitle: e.target.value })}
              // value={job.jobTitle}
              className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
              placeholder="Jacker"
              required={true}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-medium text-black dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              // onChange={(e) => setJob({ ...job, jobTitle: e.target.value })}
              // value={job.jobTitle}
              className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
              placeholder="janedoe@gmail.com"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="mb-2 block text-xs font-medium text-black dark:text-white"
            >
              Phone Number
            </label>
            <PhoneInput
              defaultCountry="in"
              className="w-full rounded-lg border-2 border-transparent bg-forminput px-2.5 py-1 focus-within:border-2 focus-within:border-primary dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus-within:border-white/70"
              countrySelectorStyleProps={{
                buttonStyle: { background: "transparent", border: "none" },
              }}
              inputProps={{
                placeholder: "+91 98992-75789",
                className:
                  "pl-2 w-full text-sm text-black bg-transparent dark:text-white dark:placeholder-white/50 dark:focus:border-white/70 focus:outline-none focus:ring-0",
              }}
              // value={phone}
              // onChange={(phone) => setPhone(phone)}
            />
          </div>
        </div>

        {/* Form action button */}
        <button
          type="submit"
          className="h-9 w-full rounded-md bg-primary text-sm font-semibold text-white hover:bg-primary/80"
        >
          Add Contact
        </button>
      </form>
    </>
  );
}

export default ContactSheet;
