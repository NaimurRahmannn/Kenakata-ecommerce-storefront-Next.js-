import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    "bg-zinc-950 text-white hover:bg-zinc-800 active:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200",
  outline:
    "border border-zinc-300 text-zinc-950 hover:bg-zinc-50 active:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900",
  ghost:
    "text-zinc-950 hover:bg-zinc-100 active:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed dark:text-white dark:hover:bg-zinc-900",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

/**
 * Button component with variant and size support.
 */
export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}

/**
 * Button link component - renders as a Link wrapper with styled anchor.
 */
export function ButtonLink({
  className,
  variant = "default",
  size = "md",
  href,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
