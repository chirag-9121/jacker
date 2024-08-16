"use client";

import DataTableRowActions from "./DataTableRowActions";

// icons
import { LuChevronsUpDown } from "react-icons/lu";
import { MdEmail } from "react-icons/md";

// ui components
import { UserAvatar } from "@/app/components/ui/user-avatar";
import { Button } from "@/app/components/ui/button";
import { FlagImage } from "react-international-phone";
import { MultiSelect } from "@/app/components/ui/multi-select";

export const getColumns = (contacts, setContacts, setSelectedCompanies) => [
  {
    accessorKey: "fullName",
    // Making the header return a button to sort asc and desc
    header: ({ column }) => {
      return (
        <Button
          className="p-0 text-xs"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <LuChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
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
    header: () => {
      // Extracting unique values of the company column to send in the multi-select component as all options
      const uniqueCompanies = [
        ...new Set(contacts.map((contact) => contact.company.toLowerCase())),
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
