"use client";

import { UserAvatar } from "@/app/components/ui/user-avatar";

export const getColumns = () => [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },

  {
    accessorKey: "company",
    header: "Company",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "number",
    header: "Phone Number",
  },
];
