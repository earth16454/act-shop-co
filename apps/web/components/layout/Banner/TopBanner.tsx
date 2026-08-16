"use client";

import React, { useState } from "react";
import { XIcon } from "lucide-react";
import { Button } from "../../ui/Button";

const TopBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-black text-white text-center py-2 px-2 sm:px-4 xl:px-0">
      <div className="relative max-w-frame mx-auto">
        <p className="text-xs sm:text-sm">
          Sign up and get 20% off to your first order.{" "}
          <span className="font-medium underline">Sign Up Now</span>
        </p>
        <Button
          variant="ghost"
          className="hover:bg-transparent absolute right-0 top-1/2 -translate-y-1/2 w-fit h-fit p-1 hidden sm:flex"
          size="icon"
          type="button"
          aria-label="close banner"
          onClick={() => setIsVisible(false)}
        >
          <XIcon size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TopBanner;
