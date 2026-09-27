import { directionsUrl, outlets } from "@/lib/outlets";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";

export function OutletGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {outlets.map((outlet) => (
        <div
          key={outlet.id}
          className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#12509b]/10 text-[#12509b]">
              <MapPin className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-base font-bold leading-snug text-zinc-900">
                {outlet.name}
              </h2>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-[#e08245]">
                {outlet.area}
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-zinc-600">
            {outlet.address}
            <br />
            {outlet.city}
          </p>

          <div className="mt-auto flex flex-col gap-2 border-t border-zinc-100 pt-3 text-sm">
            <a
              href={`tel:${outlet.phone.replace(/-/g, "")}`}
              className="flex items-center gap-2 text-zinc-700 transition-colors hover:text-[#12509b]"
            >
              <Phone className="h-4 w-4 text-[#12509b]" />
              {outlet.phone}
            </a>
            <span className="flex items-center gap-2 text-zinc-700">
              <Clock className="h-4 w-4 text-[#12509b]" />
              {outlet.hours}
            </span>
            <a
              href={directionsUrl(outlet)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-md bg-[#12509b] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Navigation className="h-4 w-4" />
              Get Directions
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
