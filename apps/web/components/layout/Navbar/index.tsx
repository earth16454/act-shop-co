import React from "react";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import InputGroup from "../../ui/InputGroup";
import CartBtn from "./CartBtn";
import ProfileBtn from "./ProfileBtn";

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0 gap-5">
        <div className="flex items-center">
          <Link href="/" className="text-2xl lg:text-[32px] mb-2">
            SHOP.CO
          </Link>
        </div>

        <InputGroup className="hidden sm:flex bg-[#F0F0F0]">
          <InputGroup.Text>
            <SearchIcon size={20} />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder="Search for products..."
          />
        </InputGroup>

        <div className="flex items-center">
          <CartBtn />
          <ProfileBtn />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
