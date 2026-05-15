import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold text-zinc-950">Register</h1>
      <p className="text-sm leading-6 text-zinc-600">Your register route is ready.</p>
      <Link href="/" className="text-sm font-medium text-zinc-950 underline underline-offset-4">
        Home
      </Link>
    </main>
  );
}