import { CartView } from "@/features/cart/components/CartView";

export default function CartPage() {
  return (
    <main className="mx-auto max-w-frame px-4 pb-20 xl:px-0">
      <hr className="mb-6 h-px border-t-black/10" />
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
        Your Cart
      </h1>
      <CartView />
    </main>
  );
}
