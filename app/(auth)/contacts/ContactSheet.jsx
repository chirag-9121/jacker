"use client";

import { useEffect, useState } from "react";
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

// Add/ Edit contact form sheet, params from custom hook and row actions
function ContactSheet({
  contactId,
  row,
  contactIsLoading,
  addContactHandler,
  editContactHandler,
  jobId,
  addAndLinkContactHandler,
}) {
  // Maintaining contact state for edit contact functionality
  const [contact, setContact] = useState({
    fullName: "",
    company: "",
    email: "",
    countryIso2: "",
    number: "",
  });

  useEffect(() => {
    // If form is triggered by edit button, contact id is present
    if (contactId) {
      setContact({
        fullName: row.fullName,
        company: row.company,
        email: row.email,
        countryIso2: row.countryIso2,
        number: row.number,
      });
    }
  }, [contactId]);

  // Plain JS variable and handler to set country iso2 for phoneNumber instead of useState
  let countryIso2 = "";
  const setPhoneNumber = (iso2, phone) => {
    // Update the variable only if iso2 has changed
    countryIso2 = countryIso2 === iso2 ? countryIso2 : iso2;
    if (contactId) {
      setContact({ ...contact, countryIso2: countryIso2, number: phone });
    }
  };

  return (
    <>
      {/* Sheet Header with title and close button */}
      <SheetHeader className="flex-row items-center justify-between">
        <SheetTitle>{contactId ? "Edit Contact" : "Add Contact"}</SheetTitle>
        <SheetDescription />
        <SheetTrigger>
          <CrossButton />
        </SheetTrigger>
      </SheetHeader>

      {/* Contact Form */}
      <form
        className="flex h-full flex-col justify-between space-y-4 md:space-y-6"
        // Sending the countryIso2 string as param to handler
        onSubmit={async (e) => {
          if (contactId) editContactHandler(e, contactId, contact);
          // if jobId is present, form is triggered from link contact sheet, add the new contact and link it to the job that triggered it
          else if (jobId) {
            let contact = await addContactHandler(e, countryIso2, jobId);
            addAndLinkContactHandler(contact);
          } else addContactHandler(e, countryIso2);
        }}
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
              value={contactId ? contact.fullName : undefined}
              onChange={
                contactId
                  ? (e) => setContact({ ...contact, fullName: e.target.value })
                  : undefined
              }
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
              value={contactId ? contact.company : undefined}
              onChange={
                contactId
                  ? (e) => setContact({ ...contact, company: e.target.value })
                  : undefined
              }
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
              value={contactId ? contact.email : undefined}
              onChange={
                contactId
                  ? (e) => setContact({ ...contact, email: e.target.value })
                  : undefined
              }
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
              onChange={(phone, meta) =>
                setPhoneNumber(meta.country.iso2, phone)
              } // onChange call phoneNumber handler and pass iso2 value as param
              value={contactId ? contact.number : undefined}
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
          {/* Updating text in button based on contactIsLoading value */}
          {/* If the contactId is present, i.e. Sheet is triggered by edit button */}
          {!contactIsLoading && contactId && "Save"}
          {contactIsLoading && contactId && "Saving..."}

          {/* If the contactId is not present, i.e. Sheet is triggered by add contact button */}
          {!contactIsLoading && !contactId && "Add Contact"}
          {contactIsLoading && !contactId && "Adding Contact..."}
        </button>
      </form>
    </>
  );
}

export default ContactSheet;
