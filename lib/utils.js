import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Function for displaying sonner
export function displayToast(message, toastType = "default") {
  if (toastType === "success") {
    toast.success(message, {
      action: {
        label: "OK",
        onClick: () => toast.dismiss(),
      },
    });
  } else if (toastType === "error") {
    toast.error(message, {
      action: {
        label: "OK",
        onClick: () => toast.dismiss(),
      },
    });
  } else {
    toast(message, {
      action: {
        label: "OK",
        onClick: () => toast.dismiss(),
      },
    });
  }
}
