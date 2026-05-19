"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeOff, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema, type LoginFormValues } from "@/features/auth/schema/auth-schema";
import { getAuthProfile, loginUser } from "@/lib/auth-api";
import { useAuthStore } from "@/store/auth-store";

export function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const tokens = await loginUser(values);
      const user = await getAuthProfile(tokens.access_token);

      setAuth(tokens, user);
      toast.success("Welcome back!");
      router.push("/");   // Redirect to home after login
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-neutral-900 dark:text-zinc-100"
        >
          Email Address
        </label>

        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-zinc-400" />

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 dark:border-zinc-700 dark:bg-[#151310] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-[#d6b36a] ${
              errors.email
                ? "border-rose-500 focus:border-rose-500"
                : "border-neutral-300"
            }`}
            {...register("email")}
          />
        </div>

        {errors.email ? (
          <p id="email-error" className="mt-1 text-xs text-rose-600">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-neutral-900 dark:text-zinc-100"
        >
          Password
        </label>

        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-zinc-400" />

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            className={`h-11 w-full rounded-lg border bg-white pl-10 pr-11 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 dark:border-zinc-700 dark:bg-[#151310] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-[#d6b36a] ${
              errors.password
                ? "border-rose-500 focus:border-rose-500"
                : "border-neutral-300"
            }`}
            {...register("password")}
          />

          <button
            type="button"
            aria-label="Show password"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 transition hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <EyeOff className="h-4 w-4" />
          </button>
        </div>

        {errors.password ? (
          <p id="password-error" className="mt-1 text-xs text-rose-600">
            {errors.password.message}
          </p>
        ) : null}

        <div className="mt-2 flex items-center justify-between">
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-[#a46d1e] transition hover:text-neutral-950 dark:text-[#d6b36a] dark:hover:text-zinc-100"
          >
            Forgot Password?
          </Link>

          <span className="text-xs text-neutral-500 dark:text-zinc-400">
            john@mail.com / changeme
          </span>
        </div>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-lg bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[#f4eddf] dark:text-zinc-950 dark:hover:bg-[#e7dccb]"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
