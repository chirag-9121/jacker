"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";

// Custom hooks and global context provider
import { useUserContext } from "@/app/components/UserProvider";
import useContactManager from "@/app/hooks/useContactManager";
import useContactColumnsManager from "@/app/hooks/useContactColumnsManager";

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
  const [contacts, setContacts] = useState([]); // The main contacts list
  const [contactsLoading, setContactsLoading] = useState(false); // To track the status of contacts (for displaying skeleton in data table)
  // Props to handle new contact from custom hook to be sent down to Contact Sheet form
  const { contactIsLoading, addContactHandler, open, setOpen, newContact } =
    useContactManager();

  const hasPageBeenRendered = useRef(false); // To bypass initial run of useEffect causing flash

  // Column and Global filter state set
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const globalFilterProps = { globalFilter, setGlobalFilter };
  const columnFilterProps = { columnFilters, setColumnFilters };

  // Filter table props importing from JobColumnsManager hook to pass as params to getColumns
  const { setSelectedCompanies } = useContactColumnsManager(setColumnFilters);

  // Returns array of objects of table columns(including how header and row ui should be rendered) to be passed down to data table component
  const columns = useMemo(
    () => getColumns(contacts, setContacts, setSelectedCompanies),
    [contacts],
  );

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
          <SearchBox globalFilterProps={globalFilterProps} />

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
            entityName="contact"
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
