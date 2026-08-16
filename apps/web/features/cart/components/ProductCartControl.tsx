"use client";

import { MinusIcon, PlusIcon } from "lucide-react";

import type { CartItem } from "../api/cart";
import {
  useAddCartItem,
  useRemoveCartItem,
  useUpdateCartItem,
} from "../hooks/useCart";

interface ProductCartControlProps {
  productId: string;
  productName: string;
  item?: CartItem;
  disabled?: boolean;
}

const iconButtonClassName =
  "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-40";

export const ProductCartControl = ({
  productId,
  productName,
  item,
  disabled = false,
}: ProductCartControlProps) => {
  const addItem = useAddCartItem();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const isPending =
    disabled ||
    addItem.isPending ||
    updateItem.isPending ||
    removeItem.isPending;
  const error = addItem.error ?? updateItem.error ?? removeItem.error;

  const decreaseQuantity = () => {
    if (!item) return;

    if (item.quantity === 1) {
      removeItem.mutate(item.id);
      return;
    }

    updateItem.mutate({ id: item.id, quantity: item.quantity - 1 });
  };

  const increaseQuantity = () => {
    if (!item) {
      addItem.mutate({ productId, quantity: 1 });
      return;
    }

    updateItem.mutate({ id: item.id, quantity: item.quantity + 1 });
  };

  return (
    <div className="flex flex-col items-end gap-2">
      {error ? (
        <span
          className="max-w-40 rounded-lg bg-red-600 px-2 py-1 text-right text-xs font-medium text-white shadow-sm"
          role="alert"
        >
          Please try again
        </span>
      ) : null}

      {item ? (
        <div className="flex h-11 items-center rounded-full bg-white px-1 shadow-sm sm:h-12">
          <button
            type="button"
            className={iconButtonClassName}
            disabled={isPending}
            aria-label={`Decrease ${productName} quantity`}
            onClick={decreaseQuantity}
          >
            <MinusIcon size={18} aria-hidden="true" />
          </button>

          <span
            className="min-w-6 text-center text-sm font-medium tabular-nums"
            aria-live="polite"
          >
            {item.quantity}
          </span>

          <button
            type="button"
            className={iconButtonClassName}
            disabled={isPending || item.quantity >= 99}
            aria-label={`Increase ${productName} quantity`}
            onClick={increaseQuantity}
          >
            <PlusIcon size={18} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-60 sm:size-12"
          disabled={isPending}
          aria-label={`Add ${productName} to cart`}
          onClick={increaseQuantity}
        >
          <PlusIcon size={20} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
