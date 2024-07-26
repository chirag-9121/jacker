import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/app/components/ui/dialog";
import CrossButton from "../ui/cross-button";

function AddJobModal() {
  return (
    <DialogContent>
      <DialogHeader className="flex-row items-center justify-between">
        <DialogTitle>Add a new job</DialogTitle>
        <DialogClose asChild>
          <CrossButton />
        </DialogClose>
      </DialogHeader>
    </DialogContent>
  );
}

export default AddJobModal;
