"use client";

import { useState, useEffect } from "react";
import { useUserContext } from "@/app/components/UserProvider";
import axios from "axios";
import { displayToast } from "@/lib/utils";

// A custom hook to provide states and handlers to add and edit contacts

const useContactManager = () => {
  const { user, userLoading } = useUserContext();
  const [contactIsLoading, setContactIsLoading] = useState(false); // to update button text while contact is being added/ edited
  const [open, setOpen] = useState(false); // to handle open state for contact sheet
  const [newContact, setNewContact] = useState();
  const [contactUpdatedFlag, setContactUpdatedFlag] = useState(false); // Tracked by columns component useEffect to update contacts list state whenever a contact is updated

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
        displayToast("Contact updated");
        setContactUpdatedFlag((prev) => !prev);
        setOpen(false);
      }
    } catch (err) {
      displayToast("Oops that didn't work", "error");
    } finally {
      setContactIsLoading(false);
    }
  };

  // New contact handler
  // Takes the default event and countryIso2 for the phonenumber field from the form submission
  const addContactHandler = async (e, countryIso2) => {
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
          setOpen(false);
          setNewContact({
            _id: response.data.savedContact._id,
            fullName,
            company,
            email,
            countryIso2,
            number,
          });
          displayToast("Contact added");
        }
      }
    } catch (err) {
      console.log(err);
      displayToast(err.response.data.error, "error");
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
    contactUpdatedFlag,
  };
};

export default useContactManager;
