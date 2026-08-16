import React from "react";
import Link from "next/link";
import { CircleUserRoundIcon } from "lucide-react";
import { Button } from "../../ui/Button";

const ProfileBtn: React.FC = () => {
  return (
    <Button variant={"ghost"} size={"icon"} asChild>
      <Link href={"/profile"} aria-label="Profile">
        <CircleUserRoundIcon size={22} />
      </Link>
    </Button>
  );
};

export default ProfileBtn;
