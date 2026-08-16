"use client";

import React from "react";
import Link from "next/link";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/features/products/components/ProductImage";
import type { CartItem } from "../api/cart";
import { useRemoveCartItem, useUpdateCartItem } from "../hooks/useCart";

interface CartItemRowProps {
  item: CartItem;
}

const formatPrice = (price: number) => `$${price.toLocaleString("en-US")}`;

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const isMutating = updateItem.isPending || removeItem.isPending;
  const mutationError = updateItem.error ?? removeItem.error;
  const product = item.product;

  const setQuantity = (quantity: number) => {
    updateItem.mutate({ id: item.id, quantity });
  };

  return (
    <article className="border-b border-black/10 py-5 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex gap-4">
        {product ? (
          <div className="w-24 shrink-0 sm:w-32">
            <ProductImage src={product.imageUrl} alt={product.name} />
          </div>
        ) : (
          <div className="flex aspect-3/4 w-24 shrink-0 items-center justify-center rounded-2xl bg-black/5 px-2 text-center text-xs text-black/50 sm:w-32">
            Product unavailable
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            {product ? (
              <Link
                href={`/product/${product.id}/${product.name.split(" ").join("-")}`}
                className="line-clamp-2 font-bold hover:underline sm:text-lg"
              >
                {product.name}
              </Link>
            ) : (
              <h2 className="font-bold">Unavailable product</h2>
            )}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 text-red-600 hover:bg-red-50 hover:text-red-700"
              aria-label={product ? `Remove ${product.name}` : "Remove item"}
              disabled={isMutating}
              onClick={() => removeItem.mutate(item.id)}
            >
              <Trash2Icon size={19} aria-hidden="true" />
            </Button>
          </div>

          {product ? (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xl font-bold">
                {formatPrice(product.discountedPrice)}
              </span>
              {product.percentageDiscount > 0 ? (
                <span className="text-sm text-black/40 line-through">
                  {formatPrice(product.price)}
                </span>
              ) : null}
            </div>
          ) : null}

          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            <span className="text-sm text-black/60">
              Line quantity: {item.quantity}
            </span>

            <div
              className="flex items-center rounded-full bg-[#F0F0F0] p-1"
              aria-label={product ? `Quantity for ${product.name}` : "Quantity"}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 rounded-full"
                aria-label="Decrease quantity"
                disabled={isMutating || item.quantity <= 1}
                onClick={() => setQuantity(item.quantity - 1)}
              >
                <MinusIcon size={16} aria-hidden="true" />
              </Button>
              <span
                className="min-w-9 text-center text-sm font-medium"
                aria-live="polite"
              >
                {item.quantity}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 rounded-full"
                aria-label="Increase quantity"
                disabled={isMutating || item.quantity >= 99}
                onClick={() => setQuantity(item.quantity + 1)}
              >
                <PlusIcon size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {mutationError ? (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {mutationError.message}
        </p>
      ) : null}
    </article>
  );
};
