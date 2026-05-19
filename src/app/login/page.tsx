import Link from "next/link";
import Image from "next/image";

import { LoginForm } from "@/features/auth/components/login-form";
export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1e9] dark:bg-[#0f0e0c]">
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-no-repeat opacity-80"
        style={{
          backgroundImage: "url('/images/login-bg.png')",
          backgroundSize: "auto 100%",
          backgroundPosition: "center top",
        }}
      />

      {/* Soft overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-[#f8f1e8]/65 to-[#f4eadf]/85 dark:from-[#0f0e0c]/85 dark:via-[#14120f]/70 dark:to-[#0b0a08]/90" />

      <section className="relative z-10 px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          {/* Heading */}
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold leading-tight text-neutral-950 md:text-5xl dark:text-zinc-100">
              Welcome Back
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-600 dark:text-zinc-400">
              Sign in to your KenaKata account and continue shopping.
            </p>
          </div>

          {/* Login Card */}
          <div className="mx-auto mt-10 w-full max-w-md rounded-2xl bg-white/95 px-5 py-6 shadow-[0_18px_50px_rgba(0,0,0,0.10)] backdrop-blur-md md:px-7 md:py-7 dark:bg-[#151310]/90">
            <div className="text-center">
              <h2 className="font-serif text-xl font-semibold text-neutral-950 md:text-2xl dark:text-zinc-100">
                Login to Your Account
              </h2>

              <p className="mt-2 text-sm text-neutral-500 dark:text-zinc-400">
                Enter your details below
              </p>
            </div>

            <LoginForm />

            {/* Divider */}
            <div className="my-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-neutral-200 dark:bg-zinc-700" />
              <span className="text-xs text-neutral-500 dark:text-zinc-400">OR</span>
              <div className="h-px flex-1 bg-neutral-200 dark:bg-zinc-700" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white text-xs font-medium text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-50 dark:border-zinc-700 dark:bg-[#141310] dark:text-zinc-100 dark:hover:border-[#d6b36a] dark:hover:bg-[#1a1916]"
              >
                <Image
                  src="/images/Google_icon.png"
                  alt="Google"
                  width={18}
                  height={18}
                  className="h-4.5 w-4.5 object-contain"
                />
                Continue with Google
              </button>

              <button
                type="button"
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white text-xs font-medium text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-50 dark:border-zinc-700 dark:bg-[#141310] dark:text-zinc-100 dark:hover:border-[#d6b36a] dark:hover:bg-[#1a1916]"
              >
                <Image
                  src="/images/Apple_icon.png"
                  alt="Apple"
                  width={18}
                  height={18}
                  className="h-4.5 w-4.5 object-contain"
                />
                Continue with Apple
              </button>
            </div>

            {/* Create Account */}
            <p className="mt-6 text-center text-sm text-neutral-700 dark:text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#a46d1e] transition hover:text-neutral-950 dark:text-[#d6b36a] dark:hover:text-zinc-100"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
