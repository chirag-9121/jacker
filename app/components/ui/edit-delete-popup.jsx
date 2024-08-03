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

function EditDeletePopup({ deleteRowHandler }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 p-0">
          <span className="sr-only">Job Actions</span>
          <BsThreeDots className="text-primary dark:text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-16" align="end">
        <DropdownMenuItem className="mb-0.5 flex gap-2 text-xs text-iconblue focus:bg-iconblue/10 focus:text-iconblue dark:focus:bg-iconblue/10 dark:focus:text-iconblue">
          <RiEditFill />
          Edit
        </DropdownMenuItem>
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
