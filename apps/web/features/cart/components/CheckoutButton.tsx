"use client";

import { useRouter } from "next/navigation";
import { ArrowRightIcon, LoaderCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useCheckoutCart } from "../hooks/useCart";

export const CheckoutButton = () => {
  const router = useRouter();
  const checkout = useCheckoutCart();

  const handleCheckout = async () => {
    try {
      const result = await checkout.mutateAsync();
      router.push(`/checkout/success/${encodeURIComponent(result.orderId)}`);
    } catch {
      // The mutation exposes the backend error below and keeps the user here.
    }
  };

  return (
    <div className="mt-6">
      <Button
        type="button"
        block
        className="h-12 gap-3 text-base"
        disabled={checkout.isPending}
        onClick={() => void handleCheckout()}
      >
        {checkout.isPending ? (
          <LoaderCircleIcon
            className="animate-spin"
            size={19}
            aria-hidden="true"
          />
        ) : null}
        {checkout.isPending ? "Processing…" : "Go to Checkout"}
        {!checkout.isPending ? (
          <ArrowRightIcon size={19} aria-hidden="true" />
        ) : null}
      </Button>

      {checkout.isError ? (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {checkout.error.message}
        </p>
      ) : null}
    </div>
  );
};
