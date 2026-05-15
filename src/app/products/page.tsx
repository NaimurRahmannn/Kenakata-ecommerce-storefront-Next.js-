import Link from 'next/link';

export default function ProductsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-6 py-16">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
          Products
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-950">Product listing</h1>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-zinc-600">
        This route is ready for product browsing content.
      </p>
      <Link href="/" className="text-sm font-medium text-zinc-950 underline underline-offset-4">
        Back to home
      </Link>
    </main>
  );
}