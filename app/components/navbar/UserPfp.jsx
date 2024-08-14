import Link from "next/link";

// ui components
import { UserAvatar } from "../ui/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import ToggleThemeButton from "@/app/components/navbar/ToggleThemeButton";

// public assets and icons
import { LuUser2 } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";

function UserPfp({ logoutHandler, user }) {
  return (
    // Actions on profile click
    <DropdownMenu>
      {/* Setting the trigger on the PFP */}
      <DropdownMenuTrigger>
        <UserAvatar name={user} />
      </DropdownMenuTrigger>

      {/* The actual dropdown containing action buttons */}
      <DropdownMenuContent
        className="p-3 font-semibold"
        onCloseAutoFocus={(e) => e.preventDefault()} // To remove border when clicked away from dropdown
      >
        <Link href="/profile">
          <DropdownMenuItem className="gap-2">
            <LuUser2 size={16} />
            Profile
          </DropdownMenuItem>
        </Link>

        <ToggleThemeButton />

        <DropdownMenuItem onClick={logoutHandler} className="gap-2">
          <AiOutlineLogout size={16} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserPfp;
