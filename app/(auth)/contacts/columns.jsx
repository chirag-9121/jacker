"use client";

import { UserAvatar } from "@/app/components/ui/user-avatar";
import DataTableRowActions from "./DataTableRowActions";
import { FlagImage } from "react-international-phone";
import { MdEmail } from "react-icons/md";

export const getColumns = (setContacts) => [
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => {
      // Extracting contact name initials to send to UserAvatar component as props
      const fullName = row.getValue("fullName");
      const fname = fullName.split(" ")[0];
      const lname = fullName.split(" ")[1];
      const contactName = {
        fname,
        lname,
      };

      return (
        <div className="flex items-center gap-2">
          <UserAvatar
            name={contactName}
            className="h-7 w-7 text-xs"
            avatarFallbackClassName="text-white bg-slate-800 dark:text-black dark:bg-primary-light"
          />
          {fullName}
        </div>
      );
    },
  },

  {
    accessorKey: "company",
    header: "Company",
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email");
      if (email)
        return (
          <div className="flex items-center gap-2">
            <MdEmail className="h-4 w-4 fill-success" />
            {email}
          </div>
        );
    },
  },

  {
    accessorKey: "number",
    header: "Phone Number",
    cell: ({ row }) => {
      // Extracting countryIso2 code from the row for displaying the country's flag infront of number
      const number = row.getValue("number");
      const contactRow = row.original;

      if (number)
        return (
          <div className="flex items-center gap-2">
            <FlagImage iso2={contactRow.countryIso2} />
            {number}
          </div>
        );
    },
  },

  // ROW ACTIONS
  {
    id: "actions",
    cell: ({ row }) => {
      const contactRow = row.original;

      // Returning a component which handles edit and delete row functionality with all necessary states
      return <DataTableRowActions row={contactRow} setContacts={setContacts} />;
    },
  },
];
