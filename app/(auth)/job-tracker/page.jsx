import AddButton from "@/app/components/ui/add-button";

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
          <AddButton btnText=" Job" />
        </div>
      </div>
    </div>
  );
}

export default JobTracker;
