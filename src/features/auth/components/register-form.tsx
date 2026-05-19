"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeOff, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schema/auth-schema";
import { registerUser } from "@/lib/auth-api";

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const { confirmPassword: _confirmPassword, ...payload } = values;
      await registerUser(payload);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
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
            autoComplete="name"
            placeholder="Enter your full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 ${
              errors.name
                ? "border-rose-500 focus:border-rose-500"
                : "border-neutral-300"
            }`}
            {...register("name")}
          />
        </div>

        {errors.name ? (
          <p id="name-error" className="mt-1 text-xs text-rose-600">
            {errors.name.message}
          </p>
        ) : null}
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
            autoComplete="email"
            placeholder="Enter your email address"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 ${
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
          className="mb-2 block text-sm font-medium text-neutral-900"
        >
          Password
        </label>

        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            className={`h-11 w-full rounded-lg border bg-white pl-10 pr-11 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 ${
              errors.password
                ? "border-rose-500 focus:border-rose-500"
                : "border-neutral-300"
            }`}
            {...register("password")}
          />

          <button
            type="button"
            aria-label="Show password"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 transition hover:text-neutral-900"
          >
            <EyeOff className="h-4 w-4" />
          </button>
        </div>

        {errors.password ? (
          <p id="password-error" className="mt-1 text-xs text-rose-600">
            {errors.password.message}
          </p>
        ) : null}

        <p className="mt-1.5 text-xs text-neutral-500">
          Must be at least 6 characters long
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
            autoComplete="new-password"
            placeholder="Confirm your password"
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={
              errors.confirmPassword ? "confirm-password-error" : undefined
            }
            className={`h-11 w-full rounded-lg border bg-white pl-10 pr-11 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 ${
              errors.confirmPassword
                ? "border-rose-500 focus:border-rose-500"
                : "border-neutral-300"
            }`}
            {...register("confirmPassword")}
          />

          <button
            type="button"
            aria-label="Show confirm password"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 transition hover:text-neutral-900"
          >
            <EyeOff className="h-4 w-4" />
          </button>
        </div>

        {errors.confirmPassword ? (
          <p
            id="confirm-password-error"
            className="mt-1 text-xs text-rose-600"
          >
            {errors.confirmPassword.message}
          </p>
        ) : null}
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
        disabled={isSubmitting}
        className="h-11 w-full rounded-lg bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Creating account..." : "Create Account"}
      </button>

      <p className="text-center text-xs text-neutral-500">
        After creating your account, sign in with your email and password.
      </p>
    </form>
  );
}
