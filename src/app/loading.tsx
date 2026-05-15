export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-sm rounded-3xl border border-zinc-200 bg-white px-8 py-10 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
          Loading
        </p>
        <p className="mt-3 text-lg text-zinc-900">Preparing the app shell...</p>
      </div>
    </main>
  );
}