"use client";

import { useCart } from "@/providers/CartProvider";
import { Minus, Plus, ShieldCheck, ShoppingCart, Trash2, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, subtotal, count, setQty, removeItem } = useCart();

  return (
    <div className="w-full bg-white pb-16">
      {/* Breadcrumb */}
      <div className="border-b border-zinc-200">
        <div className="px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-zinc-500 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-[#12509b]">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-zinc-800">Shopping Cart</span>
          </nav>
        </div>
      </div>

      <div className="px-4 pt-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
          Shopping Cart
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {count} {count === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 px-4 py-24 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
            <ShoppingCart className="h-9 w-9" />
          </span>
          <h2 className="text-xl font-extrabold text-zinc-900">
            Your cart is empty
          </h2>
          <p className="max-w-sm text-sm text-zinc-500">
            Browse our latest collections and add something you love.
          </p>
          <Link
            href="/new-in"
            className="mt-2 rounded-md bg-[#12509b] px-8 py-3 text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 px-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
          {/* Items */}
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.key}
                className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-3 sm:gap-5 sm:p-4"
              >
                <Link
                  href={`/product/${item.id}`}
                  className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-50 sm:w-24"
                >
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    sizes="6rem"
                    className="object-cover"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/product/${item.id}`}
                      className="line-clamp-2 text-sm font-semibold text-zinc-800 transition-colors hover:text-[#12509b] sm:text-base"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => removeItem(item.key)}
                      className="shrink-0 rounded p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs text-zinc-500">
                    Size : <span className="font-semibold">{item.size}</span>
                    {item.colorName && (
                      <>
                        {"  •  "}Color :{" "}
                        <span className="font-semibold">{item.colorName}</span>
                      </>
                    )}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-zinc-900">
                        ৳ {item.price.toLocaleString()}
                      </span>
                      {item.oldPrice && item.oldPrice > item.price && (
                        <span className="text-xs text-red-500 line-through">
                          ৳ {item.oldPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 rounded-full border border-[#12509b] px-1.5 py-1">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(item.key, item.qty - 1)}
                        disabled={item.qty <= 1}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-[#12509b] transition-colors hover:bg-[#12509b]/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-6 text-center text-sm font-bold">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty(item.key, item.qty + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-[#12509b] transition-colors hover:bg-[#12509b]/10"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <span className="ml-auto text-sm font-extrabold text-zinc-900 sm:text-base">
                      ৳ {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="h-fit rounded-xl border border-zinc-200 bg-zinc-50 p-5 lg:sticky lg:top-32">
            <h2 className="text-lg font-extrabold text-zinc-900">
              Order Summary
            </h2>

            <div className="mt-4 space-y-2.5 text-sm text-zinc-700">
              <div className="flex justify-between">
                <span>Subtotal ({count} items)</span>
                <span className="font-semibold">
                  ৳ {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
            </div>

            <hr className="my-4 border-zinc-300" />

            <div className="flex items-baseline justify-between">
              <span className="text-base font-bold text-zinc-900">Total</span>
              <span className="text-2xl font-black text-zinc-900">
                ৳ {subtotal.toLocaleString()}
              </span>
            </div>

            <Link
              href="/checkout"
              className="mt-5 block w-full rounded-md bg-[#12509b] py-3.5 text-center text-sm font-bold tracking-wider text-white transition-opacity hover:opacity-90"
            >
              PROCEED TO CHECKOUT
            </Link>

            <Link
              href="/new-in"
              className="mt-3 block w-full rounded-md border border-zinc-300 py-3 text-center text-sm font-bold text-zinc-700 transition-colors hover:border-[#12509b] hover:text-[#12509b]"
            >
              CONTINUE SHOPPING
            </Link>

            <div className="mt-5 space-y-2.5 border-t border-zinc-200 pt-4 text-xs text-zinc-600">
              <p className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#12509b]" />
                Home delivery all over Bangladesh
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#12509b]" />
                15 days replacement policy
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
