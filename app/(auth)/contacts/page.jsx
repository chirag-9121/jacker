"use client";

import { useState, useEffect, useRef } from "react";
import { useUserContext } from "@/app/components/UserProvider";
import useContactManager from "@/app/hooks/useContactManager";
import axios from "axios";

// Data Table components
import { getColumns } from "./columns";
import { DataTable } from "@/app/components/ui/data-table";

// Custom ui components
import AddButton from "@/app/components/ui/add-button";
import SearchBox from "@/app/components/ui/search-box";
import ContactSheet from "@/app/(auth)/contacts/ContactSheet";

// Shadcn ui components
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { ScrollArea, ScrollBar } from "@/app/components/ui/scroll-area";
import { Toaster } from "@/app/components/ui/sonner";

function Contacts() {
  const { user, userLoading } = useUserContext();
  const { contactIsLoading, addContactHandler, open, setOpen, newContact } =
    useContactManager();
  const [contactsLoading, setContactsLoading] = useState(false); // To track the status of contacts (for displaying skeleton in data table)
  const [contacts, setContacts] = useState([]);
  const hasPageBeenRendered = useRef(false); // To bypass initial run of useEffect causing flash
  const [columnFilters, setColumnFilters] = useState();
  const [globalFilter, setGlobalFilter] = useState();
  const columnFilterProps = { columnFilters, setColumnFilters };
  const globalFilterProps = { globalFilter, setGlobalFilter };

  const columns = getColumns();

  // Getter function to retrieve contacts from backend
  const getContacts = async () => {
    setContactsLoading(true);
    try {
      const response = await axios.get("/api/contacts/get-contacts", {
        params: { userId: user.id }, // Passing user id to fetch all contacts added by current user
      });
      if (response.status === 200) {
        setContacts(response.data.contacts);
      }
    } catch (err) {
    } finally {
      setContactsLoading(false);
    }
  };

  // Updating contacts state when new job is added and resetting form fields to null
  useEffect(() => {
    // Bypasses initial run
    if (hasPageBeenRendered.current) {
      setContacts((prevContacts) => [...prevContacts, newContact]);
    }
    hasPageBeenRendered.current = true;
  }, [newContact]);

  // Retrieving contacts when user is loaded
  useEffect(() => {
    if (user) getContacts();
  }, [user]);

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

      {/* Contact application Table */}
      <ScrollArea>
        <div className="mx-auto h-full w-full rounded-md pb-7 pr-1">
          <DataTable
            columns={columns}
            data={contacts}
            // To display the skeleton in data table when user and data are loading
            userLoading={userLoading}
            dataLoading={contactsLoading}
            columnFilterProps={columnFilterProps} // Sending columnFilters and setColumnFilters to data table component
            globalFilterProps={globalFilterProps} // Sending globalFilter and setGlobalFilter to data table component
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Sonner to display success msg, errors, info, etc. */}
      <Toaster richColors />
    </div>
  );
}

export default Contacts;
