"use client";

import CategoryMenu from "@/components/CategoryMenu";
import MensMenu from "@/components/MensMenu";
import MobileMenu from "@/components/MobileMenu";
import WomensMenu from "@/components/WomensMenu";
import { navLinks } from "@/lib/navigation";
import { useCart } from "@/providers/CartProvider";
import { useWishlist } from "@/providers/WishlistProvider";
import {
  Heart,
  MapPin,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SearchForm({
  className = "",
  inputId,
}: {
  className?: string;
  inputId?: string;
}) {
  return (
    <form action="/search" className={`flex items-center ${className}`}>
      <input
        type="search"
        name="q"
        id={inputId}
        placeholder="I'm shopping for ..."
        className="h-9 w-full min-w-0 rounded-l-md border-2 border-[#12509b] px-3 text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
      />
        <button
          type="submit"
          aria-label="Search"
          className="flex h-9 w-10 shrink-0 items-center justify-center rounded-r-md bg-[#12509b] text-white transition-opacity hover:opacity-90"
        >
          <Search className="h-4 w-4" />
        </button>
    </form>
  );
}

function IconBadge({ count }: { count: number }) {
  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#12509b] px-1 text-[10px] font-bold text-white">
      {count}
    </span>
  );
}

export default function Navbar() {
  const { count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="flex h-14 w-full items-center gap-3 px-4 sm:h-16 md:gap-8">
        <Link
          href="/"
          className="ml-2 flex shrink-0 flex-col leading-none sm:ml-5"
        >
          <span className="text-2xl font-extrabold tracking-tight text-[#12509b] sm:text-[2rem]">
            Loomora
          </span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
            lifestyle ltd
          </span>
        </Link>

        <SearchForm className="mx-auto hidden md:flex md:max-w-[28rem] md:flex-1" />

        <div className="ml-auto flex items-center gap-3.5 sm:gap-4 md:gap-5">
          <button
            type="button"
            aria-label="Search"
            onClick={() => {
              const input = document.getElementById("mobile-search");
              input?.scrollIntoView({ block: "center", behavior: "smooth" });
              input?.focus();
            }}
            className="text-[#12509b] md:hidden"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link href="/wishlist" aria-label="Wishlist" className="relative text-[#12509b]">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
            <IconBadge count={wishlistCount} />
          </Link>

          <Link href="/cart" aria-label="Cart" className="relative text-[#12509b]">
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            <IconBadge count={count} />
          </Link>

          <Link
            href="/account"
            aria-label="Login or register"
            className="flex items-center gap-2 text-[#12509b] transition-opacity hover:opacity-80"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 sm:h-9 sm:w-9">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <span className="hidden flex-col text-xs font-semibold leading-tight sm:flex">
              <span>Login</span>
              <span>Register</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <SearchForm inputId="mobile-search" />
      </div>

      <div className="border-y border-zinc-200">
        <div className="flex h-11 w-full items-center gap-4 px-4 sm:gap-6">
          <CategoryMenu />

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3.5 lg:flex xl:gap-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              if (link.href === "/women") {
                return <WomensMenu key={link.href} active={active} />;
              }
              if (link.href === "/men") {
                return <MensMenu key={link.href} active={active} />;
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap text-[13px] transition-colors hover:text-[#12509b] xl:text-sm ${
                    active
                      ? "font-bold text-[#12509b] underline underline-offset-4"
                      : link.highlight
                        ? "font-medium text-[#12509b] underline underline-offset-4"
                        : "font-medium text-zinc-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden shrink-0 items-center gap-5 text-xs font-semibold text-[#12509b] sm:text-sm lg:flex">
            <Link href="/order-tracking" className="flex items-center gap-1.5">
              <Truck className="h-4 w-4" />
              Order Tracking
            </Link>
            <Link href="/outlets" className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-4 w-4" />
              Outlets
            </Link>
            <Link href="/stores" aria-label="Store locations">
              <MapPin className="h-4 w-4" />
            </Link>
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
