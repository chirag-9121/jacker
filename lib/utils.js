import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Function for displaying sonner
export function displayToast(message, toastType = "default", description = "") {
  if (toastType === "success") {
    toast.success(message, {
      description: description,
      action: {
        label: "OK",
        onClick: () => toast.dismiss(),
      },
    });
  } else if (toastType === "error") {
    toast.error(message, {
      description: description,
      action: {
        label: "OK",
        onClick: () => toast.dismiss(),
      },
    });
  } else {
    toast(message, {
      description: description,
      action: {
        label: "OK",
        onClick: () => toast.dismiss(),
      },
    });
  }
}
