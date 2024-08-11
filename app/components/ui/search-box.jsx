import { CiSearch } from "react-icons/ci";

// Search component that takes globalFilter state and setter function from main page that updates data state in the data table
function SearchBox({ globalFilterProps }) {
  return (
    <div className="relative">
      <input
        value={globalFilterProps.globalFilter ?? ""}
        onChange={(e) => globalFilterProps.setGlobalFilter(e.target.value)}
        className="block w-56 rounded-md border border-transparent bg-white p-2 text-sm focus:border focus:border-black focus:outline-none focus:ring-0 dark:bg-cardcolor dark:text-white dark:placeholder-white/50 dark:focus:border-white/70"
        placeholder="Search"
      />
      <CiSearch className="absolute end-0 top-0 m-2.5 fill-grey" />
    </div>
  );
}

export default SearchBox;
