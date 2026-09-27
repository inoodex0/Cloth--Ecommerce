"use client";

import { getProduct } from "@/lib/catalog";
import { findOrder, loadOrders, saveOrder, type StoredOrder } from "@/lib/orders";
import {
  BadgeCheck,
  Check,
  ClipboardCheck,
  Home,
  MapPin,
  PackageCheck,
  Search,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

const HOUR = 3600_000;
const DAY = 24 * HOUR;

const steps = [
  {
    label: "Order Placed",
    desc: "We have received your order",
    at: 0,
    Icon: ClipboardCheck,
  },
  {
    label: "Order Confirmed",
    desc: "Order verified by our team",
    at: 5 * 60_000,
    Icon: BadgeCheck,
  },
  {
    label: "Packed & Ready",
    desc: "Packed in Loomora packaging",
    at: 4 * HOUR,
    Icon: PackageCheck,
  },
  {
    label: "Shipped — In Transit",
    desc: "On the way to your city",
    at: 12 * HOUR,
    Icon: Truck,
  },
  {
    label: "Out for Delivery",
    desc: "Rider is on the way to you",
    at: 36 * HOUR,
    Icon: MapPin,
  },
  {
    label: "Delivered",
    desc: "Package handed to customer",
    at: 60 * HOUR,
    Icon: Home,
  },
];

const paymentLabels: Record<string, string> = {
  cod: "Cash on Delivery",
  bkash: "bKash",
  nagad: "Nagad",
};

const formatDateTime = (ts: number) =>
  new Date(ts).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatDate = (ts: number) =>
  new Date(ts).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function currentStepIndex(order: StoredOrder, now: number) {
  const elapsed = Math.max(0, now - order.placedAt);
  let index = 0;
  steps.forEach((step, i) => {
    if (elapsed >= step.at) index = i;
  });
  return index;
}

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<StoredOrder | null>(null);
  const [searched, setSearched] = useState(false);
  const [recent, setRecent] = useState<StoredOrder[]>([]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const frame = requestAnimationFrame(() => setRecent(loadOrders()));
    const timer = setInterval(() => setNow(Date.now()), 30_000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(timer);
    };
  }, []);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = findOrder(orderId, phone);
    setResult(found ?? null);
    setSearched(true);
    if (found) setOrderId(found.id);
  };

  const searchOrder = (order: StoredOrder) => {
    setOrderId(order.id);
    setPhone(order.customer.phone);
    setResult(order);
    setSearched(true);
  };

  const loadDemo = () => {
    const existing = loadOrders().find((o) => o.id === "LOOM-DEMO123");
    const demo: StoredOrder =
      existing ?? {
        id: "LOOM-DEMO123",
        placedAt: Date.now() - 13 * HOUR,
        payment: "bkash",
        wallet: "01712-345678",
        trx: "8H7K2M9P",
        total:
          (getProduct("w-3")?.price ?? 1550) + (getProduct("m-1")?.price ?? 1290),
        items: [
          {
            id: "w-3",
            name: getProduct("w-3")?.name ?? "Womens Rose Festive Printed Saree",
            price: getProduct("w-3")?.price ?? 1550,
            oldPrice: 3200,
            color: getProduct("w-3")?.color ?? "#ec4899",
            src: getProduct("w-3")?.src ?? "/images/women/m-2.jpg",
            size: "Free",
            qty: 1,
          },
          {
            id: "m-1",
            name: getProduct("m-1")?.name ?? "Mens Polo Shirt",
            price: getProduct("m-1")?.price ?? 1290,
            oldPrice: 1690,
            color: getProduct("m-1")?.color ?? "#6b7280",
            src: getProduct("m-1")?.src ?? "/images/men/men.avif",
            size: "40",
            qty: 1,
          },
        ],
        customer: {
          name: "Rahim Uddin",
          phone: "01712345678",
          address: "House 12, Road 5, Dhanmondi",
          city: "Dhaka",
          area: "Dhanmondi",
          postcode: "1205",
          delivery: "home",
        },
      };

    if (!existing) saveOrder(demo);
    setRecent(loadOrders());
    searchOrder(demo);
  };

  const canSearch = orderId.trim().length > 0 && phone.trim().length > 0;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
        <Link href="/" className="transition-colors hover:text-[#12509b]">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold text-zinc-800">Order Tracking</span>
      </nav>

      {/* Search Card */}
      <form
        onSubmit={handleSearch}
        className="mt-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
          <div>
            <label
              htmlFor="order-id"
              className="block text-xs font-bold uppercase tracking-wider text-zinc-700"
            >
              Order ID
            </label>
            <input
              id="order-id"
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. LOOM-MUJHKLLK16"
              className="mt-1.5 h-11 w-full rounded-lg border border-zinc-300 bg-white px-3.5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-[#12509b] focus:ring-2 focus:ring-[#12509b]/10"
            />
          </div>
          <div>
            <label
              htmlFor="order-phone"
              className="block text-xs font-bold uppercase tracking-wider text-zinc-700"
            >
              Phone Number
            </label>
            <input
              id="order-phone"
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="mt-1.5 h-11 w-full rounded-lg border border-zinc-300 bg-white px-3.5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-[#12509b] focus:ring-2 focus:ring-[#12509b]/10"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={!canSearch}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#12509b] px-6 text-sm font-bold tracking-wide text-white shadow-md shadow-[#12509b]/25 transition-all hover:bg-[#1660b8] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <Search className="h-4 w-4" />
              TRACK ORDER
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-4">
            {recent.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => searchOrder(order)}
                className="rounded-full border border-[#12509b]/30 bg-[#12509b]/5 px-3 py-1.5 text-xs font-semibold text-[#12509b] transition-colors hover:bg-[#12509b] hover:text-white"
              >
                {order.id} · {formatDate(order.placedAt)}
              </button>
            ))}
            <button
              type="button"
              onClick={loadDemo}
              className="rounded-full border border-dashed border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-500 transition-colors hover:border-[#12509b] hover:text-[#12509b]"
            >
              Try demo order
            </button>
        </div>
      </form>

      {/* Not found */}
      {searched && !result && (
        <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
          <b className="font-bold">Order not found.</b> Order ID ar diyeMillis
          phone number milayen. ID ti apnar confirmation SMS / invoice e ache —
          example: <span className="font-mono">LOOM-XXXXXXXXXX</span>. Still
          problem hole <a href="tel:01712345678" className="font-semibold underline">01712-345678</a> e call korun.
        </div>
      )}

      {/* Result */}
      {result && (
        (() => {
          const current = currentStepIndex(result, now);
          const inDhaka = /dhaka/i.test(
            `${result.customer.city} ${result.customer.address}`
          );
          const minDays = inDhaka ? 3 : 5;
          const maxDays = inDhaka ? 5 : 7;
          const etaFrom = result.placedAt + minDays * DAY;
          const etaTo = result.placedAt + maxDays * DAY;
          const delivered = current === steps.length - 1;

          return (
            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
              {/* Timeline */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Order
                    </p>
                    <p className="text-lg font-extrabold tracking-tight text-zinc-900">
                      {result.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        delivered
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-[#12509b]"
                      }`}
                    >
                      {steps[current].label}
                    </span>
                    <p className="mt-1 text-xs text-zinc-500">
                      Placed {formatDateTime(result.placedAt)}
                    </p>
                  </div>
                </div>

                {!delivered && (
                  <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
                    <MapPin className="h-4 w-4 text-[#12509b]" />
                    Estimated delivery:{" "}
                    <b className="font-bold text-zinc-900">
                      {formatDate(etaFrom)} – {formatDate(etaTo)}
                    </b>
                    <span className="text-zinc-400">
                      ({inDhaka ? "Inside Dhaka" : "Outside Dhaka"})
                    </span>
                  </div>
                )}

                <ol className="mt-6">
                  {steps.map((step, index) => {
                    const done = index < current;
                    const active = index === current;
                    const reachable = done || active;
                    const { Icon } = step;

                    return (
                      <li key={step.label} className="relative flex gap-4 pb-7 last:pb-0">
                        {index < steps.length - 1 && (
                          <span
                            aria-hidden
                            className="absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-0.5 bg-zinc-200"
                          >
                            <span
                              className={`block w-full bg-[#12509b] transition-all ${
                                done ? "h-full" : "h-0"
                              }`}
                            />
                          </span>
                        )}

                        <span
                          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            active
                              ? "border-[#12509b] bg-[#12509b] text-white ring-4 ring-[#12509b]/15"
                              : done
                                ? "border-[#12509b] bg-[#12509b] text-white"
                                : "border-zinc-200 bg-white text-zinc-300"
                          }`}
                        >
                          {done ? <Check className="h-5 w-5 stroke-[3]" /> : <Icon className="h-5 w-5" />}
                        </span>

                        <div className="min-w-0 pt-1">
                          <p
                            className={`text-sm font-bold ${
                              reachable ? "text-zinc-900" : "text-zinc-400"
                            }`}
                          >
                            {step.label}
                          </p>
                          <p
                            className={`mt-0.5 text-xs ${
                              reachable ? "text-zinc-500" : "text-zinc-400"
                            }`}
                          >
                            {step.desc}
                          </p>
                          {done && (
                            <p className="mt-1 text-[11px] font-medium text-emerald-600">
                              {formatDateTime(result.placedAt + step.at)}
                            </p>
                          )}
                          {active && !delivered && (
                            <p className="mt-1 text-[11px] font-semibold text-[#12509b]">
                              In progress…
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Summary */}
              <div className="space-y-5">
                <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                    Order Summary
                  </h2>

                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Payment</span>
                      <b className="text-zinc-900">
                        {paymentLabels[result.payment] ?? result.payment}
                      </b>
                    </div>
                    {result.wallet && (
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Wallet</span>
                        <b className="text-zinc-900">{result.wallet}</b>
                      </div>
                    )}
                    {result.trx && (
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">TrxID</span>
                        <b className="text-zinc-900">{result.trx}</b>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Status</span>
                      <b className="text-emerald-600">
                        {result.payment === "cod" ? "Pay on Delivery" : "Paid"}
                      </b>
                    </div>
                    <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
                      <span className="text-zinc-500">Total</span>
                      <b className="text-base text-zinc-900">
                        ৳ {result.total.toLocaleString()}
                      </b>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-zinc-50 p-3.5 text-xs leading-relaxed text-zinc-600">
                    <b className="font-bold text-zinc-800">
                      {result.customer.name}
                    </b>
                    <br />
                    {result.customer.address}
                    {result.customer.area && `, ${result.customer.area}`}
                    {result.customer.city && `, ${result.customer.city}`}
                    {result.customer.postcode && ` - ${result.customer.postcode}`}
                    <br />
                    📞 {result.customer.phone} (
                    {result.customer.delivery === "office" ? "Office" : "Home"})
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                    Items ({result.items.length})
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {result.items.map((item) => (
                      <li key={`${item.id}-${item.size}`} className="flex gap-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                          <Image
                            src={item.src}
                            alt={item.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-xs font-medium leading-snug text-zinc-700">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[11px] text-zinc-500">
                            Size {item.size || "N/A"} · Qty {item.qty}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-zinc-900">
                          ৳ {(item.price * item.qty).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}
