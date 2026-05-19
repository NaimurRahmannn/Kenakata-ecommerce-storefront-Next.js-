import Image from "next/image";
import Link from "next/link";

import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1e9]">
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
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-[#f8f1e8]/65 to-[#f4eadf]/85" />

      <section className="relative z-10 px-4 pb-10 pt-6 md:pb-12 md:pt-8">
        <div className="mx-auto max-w-6xl">
          {/* Heading */}
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold leading-tight text-neutral-950 md:text-5xl">
              Create Account
            </h1>

          </div>

          {/* Register Card */}
          <div className="mx-auto mt-4 w-full max-w-md rounded-2xl bg-white/95 px-5 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.10)] backdrop-blur-md md:px-7 md:py-6">
            <div className="text-center">
              <h2 className="font-serif text-xl font-semibold text-neutral-950 md:text-2xl">
                Create Your Account
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Enter your details below to get started
              </p>
            </div>

            <RegisterForm />

            {/* Divider */}
            <div className="my-4 flex items-center gap-4">
              <div className="h-px flex-1 bg-neutral-200" />
              <span className="text-xs text-neutral-500">OR</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white text-xs font-medium text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-50"
              >
                <Image
                  src="/images/Google_icon.png"
                  alt="Google"
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] object-contain"
                />
                Continue with Google
              </button>

              <button
                type="button"
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white text-xs font-medium text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-50"
              >
                <Image
                  src="/images/Apple_icon.png"
                  alt="Apple"
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] object-contain"
                />
                Continue with Apple
              </button>
            </div>

            {/* Login Link */}
            <p className="mt-5 text-center text-sm text-neutral-700">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#a46d1e] transition hover:text-neutral-950"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}