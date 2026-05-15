import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold text-zinc-950">Checkout</h1>
      <p className="text-sm leading-6 text-zinc-600">Your checkout route is ready.</p>
      <Link href="/cart" className="text-sm font-medium text-zinc-950 underline underline-offset-4">
        Back to cart
      </Link>
    </main>
  );
}