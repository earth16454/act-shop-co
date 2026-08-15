import React from "react";
import Link from "next/link";
import type { CartSummary } from "@repo/backend";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../../ui/Button";

const CartBtn: React.FC = () => {
  const cart = { total: 0 } satisfies Partial<CartSummary>; // Mock

  return (
    <Button variant={"ghost"} size={"icon"}>
      <Link
        href="/cart"
        className="relative inline-flex size-8 items-center justify-center"
      >
        <ShoppingCartIcon size={22} />
        {cart && cart.total > 0 && (
          <span className="absolute top-0 right-0 flex h-5 min-w-5 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] leading-none font-semibold text-white ring-2 ring-white">
            {cart.total}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default CartBtn;
