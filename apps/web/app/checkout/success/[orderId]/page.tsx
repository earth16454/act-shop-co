import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default async function CheckoutSuccessPage({
  params,
}: PageProps<"/checkout/success/[orderId]">) {
  const { orderId } = await params;

  return (
    <main className="mx-auto max-w-frame px-4 pb-20 xl:px-0">
      <hr className="mb-10 h-px border-t-black/10" />

      <section className="mx-auto max-w-2xl rounded-[20px] border border-black/10 px-6 py-12 text-center sm:px-10 sm:py-16">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckIcon size={32} strokeWidth={2.5} aria-hidden="true" />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Checkout successful
        </h1>
        <p className="mx-auto mt-3 max-w-md text-black/60">
          Your order has been confirmed. Keep the order ID below for your
          reference.
        </p>

        <div className="mt-7 rounded-2xl bg-black/5 px-4 py-4">
          <span className="block text-sm text-black/60">Order ID</span>
          <strong className="mt-1 block break-all font-mono text-sm sm:text-base">
            {orderId}
          </strong>
        </div>

        <Button asChild className="mt-8 h-12 px-8 text-base">
          <Link href="/">Continue shopping</Link>
        </Button>
      </section>
    </main>
  );
}
