"use client";

import { useState } from "react";
import useContactManager from "@/app/hooks/useContactManager";

// Custom ui components
import AddButton from "@/app/components/ui/add-button";
import SearchBox from "@/app/components/ui/search-box";
import ContactSheet from "@/app/(auth)/contacts/ContactSheet";

// Shadcn ui components
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { Toaster } from "@/app/components/ui/sonner";

function Contacts() {
  const { contactIsLoading, addContactHandler, open, setOpen } =
    useContactManager();

  return (
    <div className="flex h-91v w-full flex-col gap-10 px-8 pt-7">
      {/* Header */}
      <div className="flex justify-between">
        <p className="self-center text-2xl font-bold dark:text-white">
          Contacts
        </p>
        {/* Search and Add Contacts */}
        <div className="flex gap-6">
          {/* <SearchBox globalFilterProps={globalFilterProps} /> */}

          {/* Add contact form sheet */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <AddButton>Add Contact</AddButton>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-5 rounded-s-md border-none">
              {/* Contact Sheet component containing the form */}
              <ContactSheet
                contactIsLoading={contactIsLoading}
                addContactHandler={addContactHandler}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Sonner to display success msg, errors, info, etc. */}
      <Toaster richColors />
    </div>
  );
}

export default Contacts;
