"use client";

import { useState } from "react";
import { useUserContext } from "@/app/components/UserProvider";
import axios from "axios";
import { displayToast } from "@/lib/utils";
import { TOAST_ERROR_DESCR, TOAST_ERROR_MSG } from "@/lib/constants";

// A custom hook to provide states and handlers to add and edit contacts

const useContactManager = (setContacts) => {
  const { user, userLoading } = useUserContext();
  const [contactIsLoading, setContactIsLoading] = useState(false); // to update button text while contact is being added/ edited
  const [open, setOpen] = useState(false); // to handle open state for contact sheet
  const [newContact, setNewContact] = useState();

  // Edit contact handler, Takes contact id and contact object as params
  const editContactHandler = async (e, contactId, contact) => {
    e.preventDefault();
    setContactIsLoading(true);
    try {
      // Contact id along with edited details is sent to backend for searching and updating
      const response = await axios.post("/api/contacts/edit-contact", {
        contactId: contactId,
        contact: contact,
      });
      if (response.status === 200) {
        displayToast("Contact updated", "success");
        setContacts((prevContacts) =>
          prevContacts.map((c) =>
            c._id === contactId ? { ...c, ...contact } : c,
          ),
        );
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      displayToast(TOAST_ERROR_MSG, "error", TOAST_ERROR_DESCR);
    } finally {
      setContactIsLoading(false);
    }
  };

  // New contact handler
  // Takes the default event and countryIso2 for the phonenumber field from the form submission
  const addContactHandler = async (e, countryIso2, jobId) => {
    e.preventDefault();
    setContactIsLoading(true);

    try {
      // Using the FormData class to get values of add contact form instead of managing states
      const form = new FormData(e.currentTarget);
      const fullName = form.get("fullName");
      const company = form.get("company");
      const email = form.get("email");
      const number = form.get("phoneNumber");

      // When the user has loaded, send the contact details along with the userId
      if (!userLoading) {
        const response = await axios.post("/api/contacts/add-contact", {
          userId: user.id,
          contactDetails: {
            fullName,
            company,
            email,
            phoneNumber: {
              number,
              countryIso2,
            },
          },
        });

        if (response.status === 200) {
          if (jobId) return response.data.savedContact;
          else {
            setOpen(false);
            setNewContact({
              _id: response.data.savedContact._id,
              fullName,
              company,
              email,
              countryIso2,
              number,
            });
          }
          displayToast("Contact added");
        }
      }
    } catch (err) {
      console.log(err);
      displayToast(TOAST_ERROR_MSG, "error", TOAST_ERROR_DESCR);
    } finally {
      setContactIsLoading(false);
    }
  };
  return {
    contactIsLoading,
    addContactHandler,
    editContactHandler,
    open,
    setOpen,
    newContact,
  };
};

export default useContactManager;
