import Link from "next/link";
import type { Business } from "@/data/types";

const KIND_LABEL: Record<string, string> = {
  booking: "Booking + WhatsApp",
  receipt: "Auto receipts",
  crm: "CRM pipeline",
};

export function NicheCard({ business }: { business: Business }) {
  const { theme } = business;
  return (
    <Link
      href={`/demo/${business.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: theme.brand }}
      />
      <div className="mb-5 flex items-center justify-between">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-inner"
          style={{ background: theme.soft }}
        >
          {business.logoEmoji}
        </span>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ background: theme.soft, color: theme.brand }}
        >
          {business.niche}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900">{business.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
        {business.cardSummary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {business.demoAutomations.map((kind) => (
          <span
            key={kind}
            className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
            style={{ borderColor: `${theme.brand}33`, color: theme.ink }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: theme.accent }}
            />
            {KIND_LABEL[kind] ?? kind}
          </span>
        ))}
      </div>

      <div
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
        style={{ color: theme.brand }}
      >
        View live demo
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </div>
    </Link>
  );
}
