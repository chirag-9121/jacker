import { BsThreeDots } from "react-icons/bs";
import { RiEditFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa6";

// ui components
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import JobModal from "@/app/(auth)/job-tracker/JobModal";

// Returns ui component to handle edit and delete functionality of a row
function EditDeletePopup({ editRowProps, deleteRowHandler }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 p-0">
          <span className="sr-only">Row Actions</span>
          <BsThreeDots className="text-primary dark:text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-16" align="end">
        {/* Edit Row Dialog box */}
        <Dialog open={editRowProps.open} onOpenChange={editRowProps.setOpen}>
          {/* Setting the dialog trigger on the edit dropdown menu item */}
          <DialogTrigger className="w-full">
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()} // To stop dropdown from closing
              className="mb-0.5 flex gap-2 text-xs text-iconblue focus:bg-iconblue/10 focus:text-iconblue dark:focus:bg-iconblue/10 dark:focus:text-iconblue"
            >
              <RiEditFill />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>

          {/* The dialog box that contains the edit job modal */}
          <DialogContent>
            <JobModal
              jobId={editRowProps.jobId}
              job={editRowProps.job}
              setJob={editRowProps.setJob}
              jobIsLoading={editRowProps.jobIsLoading}
              editJobHandler={editRowProps.editJobHandler}
            />
          </DialogContent>
        </Dialog>
        <DropdownMenuItem
          onClick={deleteRowHandler}
          className="flex gap-2 text-xs text-error focus:bg-error/10 focus:text-error dark:focus:bg-error/10 dark:focus:text-error"
        >
          <FaTrash size={10} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default EditDeletePopup;
