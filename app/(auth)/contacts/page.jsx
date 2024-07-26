import AddButton from "@/app/components/ui/add-button";

function Contacts() {
  return (
    <div className="w-full p-7 pl-12 pr-12">
      {/* Header */}
      <div className="flex justify-between">
        <p className="self-center text-2xl font-bold dark:text-white">
          Contacts
        </p>
        {/* Search and Add Contacts */}
        <div>
          <AddButton btnText=" Contact" />
        </div>
      </div>
    </div>
  );
}

export default Contacts;
