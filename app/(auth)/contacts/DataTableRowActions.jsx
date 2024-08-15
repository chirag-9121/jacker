"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import EditDeletePopup from "@/app/components/ui/edit-delete-popup";
import { displayToast } from "@/lib/utils";
import useContactManager from "@/app/hooks/useContactManager";

function DataTableRowActions({ row, setContacts }) {
  // ***Edit Job Application***
  const hasPageBeenRendered = useRef(false); // To bypass initial run of useEffect causing flash

  // Creating an initial state consisting of current contact details to be passed into edit contact sheet form
  const [contact, setContact] = useState({
    fullName: row.fullName,
    company: row.company,
    email: row.email,
    countryIso2: row.countryIso2,
    number: row.number,
  });

  // Destructuring necessary props from custom hook
  const {
    contactIsLoading,
    editContactHandler,
    open,
    setOpen,
    contactUpdatedFlag,
  } = useContactManager();

  // Creating a prop object that consists all neccessary props to handle edit job functionality
  const editContactProps = {
    contactId: row._id,
    contact,
    setContact,
    open,
    setOpen,
    contactIsLoading,
    editContactHandler,
  };

  // Updating contacts state when a contact update is successful
  useEffect(() => {
    // Bypasses initial run
    if (hasPageBeenRendered.current) {
      setContacts((prevContacts) =>
        prevContacts.map((c) => (c._id === row._id ? { ...c, ...contact } : c)),
      );
    }
    hasPageBeenRendered.current = true;
  }, [contactUpdatedFlag]);

  // ***Delete Contact Application***
  const deleteContactHandler = async () => {
    try {
      const response = await axios.post("/api/contacts/delete-contact", {
        contactId: row._id,
      });
      if (response.status === 200) {
        // Once the contact is deleted from backend, simply filtering it from the state
        setContacts((prevContacts) =>
          prevContacts.filter((c) => c._id !== row._id),
        );
        displayToast("Contact delted");
      }
    } catch (err) {
      displayToast("Oops! That didn't work", "error");
    }
  };

  return (
    // UI component consisting of edit and delete button
    <EditDeletePopup
      editRowProps={editContactProps}
      deleteRowHandler={deleteContactHandler}
    />
  );
}

export default DataTableRowActions;
