"use client";

import { useState } from "react";

// Custom ui components
import AddButton from "@/app/components/ui/add-button";
import SearchBox from "@/app/components/ui/search-box";
import ContactSheet from "@/app/(auth)/contacts/ContactSheet";

// Shadcn ui components
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";

function Contacts() {
  const [globalFilter, setGlobalFilter] = useState("");
  const globalFilterProps = { globalFilter, setGlobalFilter };

  return (
    <div className="flex h-91v w-full flex-col gap-10 px-8 pt-7">
      {/* Header */}
      <div className="flex justify-between">
        <p className="self-center text-2xl font-bold dark:text-white">
          Contacts
        </p>
        {/* Search and Add Contacts */}
        <div className="flex gap-6">
          <SearchBox globalFilterProps={globalFilterProps} />

          <Sheet>
            <SheetTrigger>
              <AddButton>Add Contact</AddButton>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-5 rounded-s-md border-none">
              <ContactSheet />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
