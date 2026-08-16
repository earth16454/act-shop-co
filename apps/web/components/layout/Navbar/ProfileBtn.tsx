import React from "react";
import { CircleUserRoundIcon } from "lucide-react";

import { Button } from "../../ui/Button";

const ProfileBtn: React.FC = () => {
  return (
    <Button variant={"ghost"} size={"icon"} aria-label="Profile">
      <CircleUserRoundIcon size={22} />
    </Button>
  );
};

export default ProfileBtn;
