import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md rounded-3xl border border-zinc-200 bg-white px-8 py-10 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
          404
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-zinc-950">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          The page you requested does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}