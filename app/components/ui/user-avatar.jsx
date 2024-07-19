// import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

function UserAvatar({ className, ...props }) {
  return (
    <Avatar className={className}>
      <AvatarImage src="" alt="PFP" />

      <AvatarFallback className="dark:text-white">
        {props.user.fname[0]}
        {props.user.lname[0]}
      </AvatarFallback>
    </Avatar>
  );
}

export { UserAvatar };
