import axios from "axios";
import EditDeletePopup from "@/app/components/ui/edit-delete-popup";
import { displayToast } from "@/lib/utils";
import useContactManager from "@/app/hooks/useContactManager";

function DataTableRowActions({ row, setContacts }) {
  // ***Edit Job Application***

  // Destructuring necessary props from custom hook
  const { contactIsLoading, editContactHandler, open, setOpen } =
    useContactManager(setContacts);

  // Creating a prop object that consists all neccessary props to handle edit job functionality
  const editContactProps = {
    contactId: row._id,
    row,
    open,
    setOpen,
    contactIsLoading,
    editContactHandler,
  };

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
        displayToast("Contact deleted");
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
