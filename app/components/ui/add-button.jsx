import { cn } from "@/lib/utils";
import { IoAddOutline } from "react-icons/io5";

function AddButton({ className, btnText }) {
  return (
    <div
      className={cn(
        "flex h-9 w-auto items-center justify-center gap-1 rounded-lg border border-primary p-2 text-sm font-semibold text-black shadow shadow-primary hover:bg-primary hover:text-white dark:text-white",
        className,
      )}
    >
      <IoAddOutline className="text-lg" />
      Add{btnText}
    </div>
  );
}

export default AddButton;
