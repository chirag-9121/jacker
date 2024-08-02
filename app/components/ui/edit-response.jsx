import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";

// A dropdown ui to display and select 3 states: Positive, Pending and Rejection to update job response status
function EditResponse({ editResponseHandler }) {
  return (
    <DropdownMenuContent
      className="flex w-full min-w-0 flex-col items-center justify-center"
      align="center"
    >
      {/* Calls the editResponseHandler in columns component for job data-table */}
      <DropdownMenuItem
        onClick={(e) => editResponseHandler("Positive")}
        className="m-0.5 flex gap-2 rounded-full px-4 text-xs text-success focus:bg-success/10 focus:text-success dark:focus:bg-success/10 dark:focus:text-success"
      >
        Positive
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={(e) => editResponseHandler("Pending")}
        className="m-0.5 flex gap-2 rounded-full px-4 text-xs text-warning focus:bg-warning/10 focus:text-warning dark:focus:bg-warning/10 dark:focus:text-warning"
      >
        Pending
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={(e) => editResponseHandler("Rejection")}
        className="m-0.5 flex gap-2 rounded-full px-4 text-xs text-error focus:bg-error/10 focus:text-error dark:focus:bg-error/10 dark:focus:text-error"
      >
        Rejection
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export default EditResponse;
