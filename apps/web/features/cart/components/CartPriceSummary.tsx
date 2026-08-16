import type { CartSummary } from "../api/cart";

interface CartPriceSummaryProps {
  cart: CartSummary;
}

const formatPrice = (price: number) => `$${price.toLocaleString("en-US")}`;

export const CartPriceSummary = ({ cart }: CartPriceSummaryProps) => {
  return (
    <aside className="rounded-[20px] border border-black/10 p-5 sm:p-6">
      <h2 className="text-xl font-bold sm:text-2xl">Order Summary</h2>

      <dl className="mt-5 space-y-4 text-black/60">
        <div className="flex items-center justify-between gap-4">
          <dt>Items</dt>
          <dd className="font-semibold text-black">{cart.totalItems}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt>Subtotal</dt>
          <dd className="font-semibold text-black">
            {formatPrice(cart.subtotal)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt>Discount</dt>
          <dd className="font-semibold text-red-600">
            -{formatPrice(cart.totalDiscount)}
          </dd>
        </div>
      </dl>

      <hr className="my-5 border-black/10" />

      <div className="flex items-center justify-between gap-4">
        <span className="text-lg">Total</span>
        <strong className="text-2xl">{formatPrice(cart.total)}</strong>
      </div>
    </aside>
  );
};
