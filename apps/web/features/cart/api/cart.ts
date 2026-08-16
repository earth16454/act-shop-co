import { queryOptions } from "@tanstack/react-query";
import type { Treaty } from "@elysiajs/eden";

import { api } from "@/lib/eden";

export type CartSummary = Treaty.Data<typeof api.cart.get>;
export type CartItem = CartSummary["items"][number];
export type CheckoutResult = Treaty.Data<typeof api.cart.checkout.post>;

type AddCartItemBody = NonNullable<Parameters<typeof api.cart.items.post>[0]>;
type CartItemRoute = ReturnType<typeof api.cart.items>;
type UpdateCartItemBody = NonNullable<Parameters<CartItemRoute["patch"]>[0]>;

export interface UpdateCartItemInput extends UpdateCartItemBody {
  id: string;
}

export const cartKeys = {
  all: ["cart"] as const,
  summary: () => [...cartKeys.all, "summary"] as const,
};

const errorMessage = (value: unknown) => {
  if (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof value.message === "string"
  ) {
    return value.message;
  }

  return "The cart couldn't be updated. Please try again.";
};

const fetchCart = async (): Promise<CartSummary> => {
  const { data, error } = await api.cart.get();
  if (error) throw new Error(errorMessage(error.value));
  return data;
};

export const cartQueryOptions = () =>
  queryOptions({
    queryKey: cartKeys.summary(),
    queryFn: fetchCart,
  });

export const addCartItem = async (body: AddCartItemBody) => {
  const { data, error } = await api.cart.items.post(body);
  if (error) throw new Error(errorMessage(error.value));
  return data;
};

export const updateCartItem = async ({ id, ...body }: UpdateCartItemInput) => {
  const { data, error } = await api.cart.items({ id }).patch(body);
  if (error) throw new Error(errorMessage(error.value));
  return data;
};

export const removeCartItem = async (id: string) => {
  const { data, error } = await api.cart.items({ id }).delete();
  if (error) throw new Error(errorMessage(error.value));
  return data;
};

export const checkoutCart = async (): Promise<CheckoutResult> => {
  const { data, error } = await api.cart.checkout.post();
  if (error) throw new Error(errorMessage(error.value));
  return data;
};
