"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import EditDeletePopup from "@/app/components/ui/edit-delete-popup";
import { displayToast } from "@/lib/utils";

function DataTableRowActions({ row, setContacts }) {
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
    <EditDeletePopup editRowProps="" deleteRowHandler={deleteContactHandler} />
  );
}

export default DataTableRowActions;
