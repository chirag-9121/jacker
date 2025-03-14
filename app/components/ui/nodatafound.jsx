import NoDataFoundSvg from "@/public/undraw_empty.svg";

// Image and message to display when no data is found
const NoDataFound = ({ entityName }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <img
        src={NoDataFoundSvg.src}
        alt="No Data Found"
        className="h-[20vw] w-[20vw]"
      />
      <p className="font-normal md:text-base">
        All quiet here, add a {entityName} to see the magic.
      </p>
    </div>
  );
};

export default NoDataFound;
