"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/features/cart/hooks/useCart";

const CartBtn: React.FC = () => {
  const cartQuery = useCart();
  const totalItems = cartQuery.data?.totalItems ?? 0;

  return (
    <Button variant={"ghost"} size={"icon"} asChild>
      <Link
        href="/cart"
        aria-label="Cart"
        className="relative inline-flex size-8 items-center justify-center"
      >
        <ShoppingCartIcon size={22} />
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 flex h-5 min-w-5 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] leading-none font-semibold text-white ring-2 ring-white">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default CartBtn;
