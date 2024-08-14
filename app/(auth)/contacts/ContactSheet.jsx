import CrossButton from "@/app/components/ui/cross-button";

// A react component library for phone number input along with country codes
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

// Shadcn ui components
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/app/components/ui/sheet";

// Add/ Edit contact form sheet, params from custom hook
function ContactSheet({ contactIsLoading, addContactHandler }) {
  // Plain JS variable and handler to set country iso2 for phoneNumber instead of useState
  let countryIso2 = "";
  const setCountryIso2 = (iso2) => {
    // Update the variable only if iso2 has changed
    countryIso2 = countryIso2 === iso2 ? countryIso2 : iso2;
  };

  return (
    <>
      {/* Sheet Header with title and close button */}
      <SheetHeader className="flex-row items-center justify-between">
        <SheetTitle>Add Contact</SheetTitle>
        <SheetDescription />
        <SheetTrigger>
          <CrossButton />
        </SheetTrigger>
      </SheetHeader>

      {/* Contact Form */}
      <form
        className="flex h-full flex-col justify-between space-y-4 md:space-y-6"
        // Sending the countryIso2 string as param to handler
        onSubmit={(e) => addContactHandler(e, countryIso2)}
      >
        {/* Full Name Field */}
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
              name="fullName"
              id="fullName"
              className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
              placeholder="Jane Doe"
              required={true}
            />
          </div>

          {/* Company Field */}
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
              className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
              placeholder="Jacker"
              required={true}
            />
          </div>

          {/* Email Field */}
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
              className="block w-full rounded-lg border-2 border-transparent bg-forminput p-2.5 text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0 dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
              placeholder="janedoe@gmail.com"
            />
          </div>

          {/* Phone number Field */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="mb-2 block text-xs font-medium text-black dark:text-white"
            >
              Phone Number
            </label>
            {/* React Phone Input Component */}
            <PhoneInput
              defaultCountry="in"
              disableDialCodePrefill={true} // removes the prefix of +91 set to the input value
              // Main div styles containing the select button and phone number input
              className="w-full rounded-lg border-2 border-transparent bg-forminput px-2.5 py-1 focus-within:border-2 focus-within:border-primary dark:bg-forminput/10 dark:text-white dark:placeholder-white/50 dark:focus-within:border-white/70"
              onChange={(phone, meta) => setCountryIso2(meta.country.iso2)} // onChange call countryIso2 handler and pass iso2 value as param
              // Select button styles
              countrySelectorStyleProps={{
                buttonStyle: { background: "transparent", border: "none" },
              }}
              // Phone number input props and styles
              inputProps={{
                name: "phoneNumber",
                placeholder: "+91 98992-75789",
                className:
                  "pl-2 w-full text-sm text-black bg-transparent dark:text-white dark:placeholder-white/50 dark:focus:border-white/70 focus:outline-none focus:ring-0",
              }}
            />
          </div>
        </div>

        {/* Form action button */}
        <button
          type="submit"
          className="h-9 w-full rounded-md bg-primary text-sm font-semibold text-white hover:bg-primary/80"
        >
          {!contactIsLoading && "Add Contact"}
          {contactIsLoading && "Adding Contact.."}
        </button>
      </form>
    </>
  );
}

export default ContactSheet;
