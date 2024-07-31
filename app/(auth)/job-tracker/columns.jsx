"use client";

import { format } from "date-fns";

// public assets and icons
import { BsThreeDots } from "react-icons/bs";
import { IoCalendar } from "react-icons/io5";

// ui components
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

// import { ColumnDef } from "@tanstack/react-table";

export const columns = [
  {
    accessorKey: "jobTitle",
    header: "Job Title",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "jobUrl",
    header: "Link to Job Advert",
    cell: ({ row }) => {
      const jobUrl = row.getValue("jobUrl");

      return <div className="text-primary">{jobUrl}</div>;
    },
  },
  {
    accessorKey: "salary",
    header: "Expected Salary",
    cell: ({ row }) => {
      const salary = parseFloat(row.getValue("salary"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(salary);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "applicationDate",
    header: "Application Date",
    cell: ({ row }) => {
      const formatted = row.getValue("applicationDate");

      return (
        <div className="flex items-center gap-3">
          <IoCalendar className="text-iconblue" />
          <div>{format(formatted, "PPP")}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "response",
    header: "Response",
  },
  {
    accessorKey: "followUpDate",
    header: "Follow-up Date",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 p-0">
              <span className="sr-only">Open menu</span>
              <BsThreeDots className="text-primary dark:text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(job.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
