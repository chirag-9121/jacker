// ui components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

// public assets and icons
import { Half2Icon } from "@radix-ui/react-icons";
import { LuUser2 } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";

function UserPfp({ logoutHandler, user }) {
  return (
    <div className="flex items-center justify-end gap-10">
      {/* Notification icon */}
      <IoNotifications size={20} className="fill-white" />

      {/* Actions on profile click */}
      <DropdownMenu>
        {/* Setting the trigger on the PFP */}
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="" alt="PFP" />
            <AvatarFallback className="dark:text-white">
              {user.fname[0]}
              {user.lname[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        {/* The actual dropdown containing action buttons */}
        <DropdownMenuContent
          className="p-3 font-semibold"
          onCloseAutoFocus={(e) => e.preventDefault()} // To remove border when clicked away from dropdown
        >
          <DropdownMenuItem className="gap-2">
            <LuUser2 size={16} />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Half2Icon />
            Dark Theme
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logoutHandler} className="gap-2">
            <AiOutlineLogout size={16} />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserPfp;