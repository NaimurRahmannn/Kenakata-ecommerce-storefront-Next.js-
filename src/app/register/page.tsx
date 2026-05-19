import Image from "next/image";
import Link from "next/link";
import { EyeOff, Lock, Mail, User } from "lucide-react";

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

            <form className="mt-4 space-y-3">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-neutral-900"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="h-11 w-full rounded-lg border border-neutral-300 bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-900"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="h-11 w-full rounded-lg border border-neutral-300 bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-neutral-900"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className="h-11 w-full rounded-lg border border-neutral-300 bg-white pl-10 pr-11 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900"
                  />

                  <button
                    type="button"
                    aria-label="Show password"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 transition hover:text-neutral-900"
                  >
                    <EyeOff className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-1.5 text-xs text-neutral-500">
                  Must be at least 8 characters long
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-neutral-900"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="h-11 w-full rounded-lg border border-neutral-300 bg-white pl-10 pr-11 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900"
                  />

                  <button
                    type="button"
                    aria-label="Show confirm password"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 transition hover:text-neutral-900"
                  >
                    <EyeOff className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2 text-xs leading-5 text-neutral-700">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-neutral-300 accent-neutral-950"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-[#a46d1e] transition hover:text-neutral-950"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-semibold text-[#a46d1e] transition hover:text-neutral-950"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="h-11 w-full rounded-lg bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Create Account
              </button>
            </form>

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