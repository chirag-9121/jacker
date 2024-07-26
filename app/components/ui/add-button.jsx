import { cn } from "@/lib/utils";
import { IoAddOutline } from "react-icons/io5";

function AddButton({ className, btnText }) {
  return (
    <button
      className={cn(
        "flex h-9 w-auto items-center justify-center gap-1 rounded-lg bg-primary p-2 text-sm font-semibold text-white hover:bg-primary/80",
        className,
      )}
    >
      <IoAddOutline className="text-lg" />
      Add{btnText}
    </button>
  );
}

export default AddButton;
