'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md rounded-3xl border border-red-200 bg-white px-8 py-10 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-red-500">
          Error
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-zinc-950">
          Something went wrong.
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          The route failed to render. Try again to reload the segment.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Try again
        </button>
      </div>
    </main>
  );
}