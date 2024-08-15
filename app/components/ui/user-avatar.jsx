// import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

// User avatar to display initials inside a circle
// Takes the classname for avatar, name which contains fname and lname and classname for AvatarFallback
function UserAvatar({ className, name, avatarFallbackClassName = "" }) {
  const fname = name.fname ? name.fname[0] : "";
  const lname = name.lname ? name.lname[0] : "";
  return (
    <Avatar className={className}>
      <AvatarImage src="" alt="PFP" />

      <AvatarFallback className={avatarFallbackClassName}>
        {fname}
        {lname}
      </AvatarFallback>
    </Avatar>
  );
}

export { UserAvatar };
