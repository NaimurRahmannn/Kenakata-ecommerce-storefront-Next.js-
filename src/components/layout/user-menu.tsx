"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogOut,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { useAuthStore } from "@/store/auth-store";

const iconButtonClasses =
  "inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-900 transition-colors hover:bg-[#f4eddf] hover:text-[#a77a2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a77a2d] dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-[#d6b36a] dark:focus-visible:ring-[#d6b36a]";

const menuItemClasses =
  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-900 transition hover:bg-[#f4eddf] hover:text-[#a77a2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a77a2d] dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-[#d6b36a] dark:focus-visible:ring-[#d6b36a]";

const getInitials = (name?: string, email?: string) => {
  const source = name?.trim() || email?.trim() || "";
  if (!source) {
    return "U";
  }

  const parts = source.split(" ").filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  const first = parts[0][0] ?? "";
  const last = parts[parts.length - 1][0] ?? "";
  return `${first}${last}`.toUpperCase();
};

export function UserMenu() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) {
        return;
      }

      if (!menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    setIsOpen(false);
    router.push("/login");
  };

  if (!mounted) {
    return (
      <div className="relative" ref={menuRef}>
        <span className={iconButtonClasses} aria-hidden="true">
          <UserRound className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="relative" ref={menuRef}>
        <Link href="/login" aria-label="Login" className={iconButtonClasses}>
          <UserRound className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const displayName = user.name?.trim() || "KenaKata Member";
  const displayEmail = user.email?.trim() || "";
  const displayRole = user.role?.trim() || "";
  const avatarUrl = user.avatar?.trim() || "";
  const initials = getInitials(displayName, displayEmail);
  const ordersHref = "/dashboard";
  const profileHref = "/dashboard";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((open) => !open)}
        className={iconButtonClasses}
      >
        <UserRound className="h-5 w-5" aria-hidden="true" />
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 z-40 mt-2 w-72 rounded-xl border border-[#eadfce] bg-[#fffdf8] p-3 text-zinc-900 shadow-[0_12px_30px_rgba(0,0,0,0.12)] dark:border-zinc-800 dark:bg-[#141310] dark:text-zinc-100"
        >
          <div className="flex items-center gap-3 border-b border-[#eadfce] pb-3 dark:border-zinc-800">
            {avatarUrl ? (
              <div
                className="h-11 w-11 rounded-full bg-[#f4eddf] bg-cover bg-center dark:bg-[#1f1b14]"
                style={{ backgroundImage: `url('${avatarUrl}')` }}
                aria-hidden="true"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4eddf] text-sm font-semibold text-[#a77a2d] dark:bg-[#1f1b14] dark:text-[#d6b36a]">
                {initials}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {displayName}
              </p>
              {displayEmail ? (
                <p className="truncate text-xs text-zinc-600 dark:text-zinc-400">
                  {displayEmail}
                </p>
              ) : null}
              {displayRole ? (
                <p className="mt-1 text-[11px] uppercase tracking-wide text-[#a77a2d] dark:text-[#d6b36a]">
                  {displayRole}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <Link
              href={ordersHref}
              className={menuItemClasses}
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Orders
            </Link>
            <Link
              href={profileHref}
              className={menuItemClasses}
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              <UserRound className="h-4 w-4" aria-hidden="true" />
              Profile
            </Link>
          </div>

          <div className="mt-3 border-t border-[#eadfce] pt-3 dark:border-zinc-800">
            <button
              type="button"
              onClick={handleLogout}
              className={`${menuItemClasses} w-full justify-start`}
              role="menuitem"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
