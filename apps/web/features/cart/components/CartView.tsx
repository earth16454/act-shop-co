"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { NotFoundAlert } from "@/components/ui/NotFoundAlert";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCart } from "../hooks/useCart";
import { CartItemRow } from "./CartItemRow";
import { CartPriceSummary } from "./CartPriceSummary";

const CartSkeleton: React.FC = () => (
  <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
    <Skeleton className="h-96 rounded-[20px]" />
    <Skeleton className="h-72 rounded-[20px]" />
  </div>
);

export const CartView: React.FC = () => {
  const cartQuery = useCart();

  if (cartQuery.isPending) return <CartSkeleton />;

  if (cartQuery.isError && cartQuery.data === undefined) {
    return (
      <ErrorAlert
        title="Your cart is unavailable"
        description={cartQuery.error.message}
        onRetry={() => void cartQuery.refetch()}
        isLoading={cartQuery.isFetching}
      />
    );
  }

  if (cartQuery.data.items.length === 0) {
    return (
      <NotFoundAlert
        title="Your cart is empty"
        description="Add something from the catalogue to get started."
      >
        <Button asChild className="mt-6 px-6">
          <Link href="/">Continue shopping</Link>
        </Button>
      </NotFoundAlert>
    );
  }

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
      <section
        className="rounded-[20px] border border-black/10 p-4 sm:p-6"
        aria-label="Cart items"
      >
        {cartQuery.data.items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </section>

      <CartPriceSummary cart={cartQuery.data} />
    </div>
  );
};
