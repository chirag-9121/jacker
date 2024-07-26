import AddJob from "@/app/components/modals/AddJobModal";
import AddButton from "@/app/components/ui/add-button";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";

function JobTracker() {
  return (
    <div className="w-full p-7 pl-12 pr-12">
      {/* Header */}
      <div className="flex justify-between">
        <p className="self-center text-2xl font-bold dark:text-white">
          Job Tracker
        </p>
        {/* Search and Add Job */}
        <div>
          <Dialog>
            <DialogTrigger>
              <AddButton btnText=" Job" />
            </DialogTrigger>
            <AddJob />
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default JobTracker;
