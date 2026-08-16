import React, { Suspense } from "react";
import Link from "next/link";
import CartBtn from "./CartBtn";
import ProfileBtn from "./ProfileBtn";
import {
  ProductSearch,
  ProductSearchFallback,
} from "@/features/filters/ProductSearch";

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="relative mx-auto flex max-w-frame flex-wrap items-center justify-between gap-4 px-4 py-5 sm:flex-nowrap md:justify-start md:gap-5 md:py-6 xl:px-0">
        <div className="flex items-center">
          <Link href="/" className="text-2xl lg:text-[32px] mb-2">
            SHOP.CO
          </Link>
        </div>

        <Suspense fallback={<ProductSearchFallback />}>
          <ProductSearch />
        </Suspense>

        <div className="flex items-center">
          <CartBtn />
          <ProfileBtn />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
