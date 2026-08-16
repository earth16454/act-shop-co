"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addCartItem,
  cartKeys,
  cartQueryOptions,
  checkoutCart,
  removeCartItem,
  updateCartItem,
} from "../api/cart";

export const useCart = () => useQuery(cartQueryOptions());

const useInvalidateCart = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: cartKeys.all,
    });
};

export const useAddCartItem = () => {
  const invalidateCart = useInvalidateCart();

  return useMutation({
    mutationFn: addCartItem,
    onSuccess: invalidateCart,
  });
};

export const useUpdateCartItem = () => {
  const invalidateCart = useInvalidateCart();

  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: invalidateCart,
  });
};

export const useRemoveCartItem = () => {
  const invalidateCart = useInvalidateCart();

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: invalidateCart,
  });
};

export const useCheckoutCart = () => {
  const invalidateCart = useInvalidateCart();

  return useMutation({
    mutationFn: checkoutCart,
    onSuccess: invalidateCart,
  });
};
