"use client";

import { useMemo, useState } from "react";
import type { Business } from "@/data/types";

const TAX_RATE = 0.085;

export function ReceiptGenerator({ business }: { business: Business }) {
  const priced = useMemo(
    () => business.services.filter((s) => (s.price ?? 0) > 0),
    [business.services],
  );
  const [qty, setQty] = useState<Record<string, number>>({});
  const [sent, setSent] = useState(false);

  const lineItems = priced
    .map((s) => ({ ...s, count: qty[s.name] ?? 0 }))
    .filter((s) => s.count > 0);

  const subtotal = lineItems.reduce((sum, s) => sum + (s.price ?? 0) * s.count, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  function setCount(name: string, next: number) {
    setSent(false);
    setQty((q) => ({ ...q, [name]: Math.max(0, next) }));
  }

  const receiptNo = useMemo(
    () => `#${Math.floor(1000 + Math.random() * 9000)}`,
    [],
  );
  const fmt = (n: number) => `${business.currency}${n.toFixed(2)}`;
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Item picker */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h4 className="text-lg font-bold text-gray-900">Build the order</h4>
        <p className="mt-1 text-sm text-gray-500">
          Add items and the receipt generates itself, instantly and itemized.
        </p>
        <div className="mt-5 space-y-3">
          {priced.map((s) => {
            const count = qty[s.name] ?? 0;
            return (
              <div
                key={s.name}
                className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 p-3"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-gray-900">{s.name}</div>
                  <div className="text-xs text-gray-500">{fmt(s.price ?? 0)}</div>
                </div>
                <div className="flex flex-none items-center gap-2">
                  <Stepper
                    onClick={() => setCount(s.name, count - 1)}
                    disabled={count === 0}
                  >
                    &minus;
                  </Stepper>
                  <span className="w-6 text-center text-sm font-semibold">{count}</span>
                  <Stepper onClick={() => setCount(s.name, count + 1)}>+</Stepper>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Receipt preview */}
      <div className="flex flex-col">
        <div className="relative flex-1 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100">
          <div
            className="absolute inset-x-0 top-0 h-2 rounded-t-3xl"
            style={{ background: business.theme.brand }}
          />
          <div className="flex items-start justify-between border-b border-dashed border-gray-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{business.logoEmoji}</span>
                <span className="font-bold text-gray-900">{business.name}</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">{business.contact.address}</div>
            </div>
            <div className="text-right text-xs text-gray-500">
              <div className="font-semibold text-gray-700">Receipt {receiptNo}</div>
              <div>{today}</div>
            </div>
          </div>

          <div className="min-h-[140px] py-4">
            {lineItems.length === 0 ? (
              <p className="py-10 text-center text-sm text-gray-400">
                Add items on the left to generate a receipt.
              </p>
            ) : (
              <table className="w-full text-sm">
                <tbody>
                  {lineItems.map((s) => (
                    <tr key={s.name} className="animate-fade-up">
                      <td className="py-1.5 text-gray-700">
                        {s.name}
                        <span className="text-gray-400"> &times;{s.count}</span>
                      </td>
                      <td className="py-1.5 text-right font-medium text-gray-900">
                        {fmt((s.price ?? 0) * s.count)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="space-y-1.5 border-t border-dashed border-gray-200 pt-4 text-sm">
            <Row label="Subtotal" value={fmt(subtotal)} />
            <Row label={`Tax (${(TAX_RATE * 100).toFixed(1)}%)`} value={fmt(tax)} />
            <div className="flex justify-between pt-1 text-base font-bold text-gray-900">
              <span>Total</span>
              <span style={{ color: business.theme.brand }}>{fmt(total)}</span>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] text-gray-400">
            Auto-generated by AI &middot; emailed &amp; texted to the customer
          </p>
        </div>

        <button
          type="button"
          disabled={lineItems.length === 0}
          onClick={() => setSent(true)}
          className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sent ? "Receipt sent \u2713" : "Generate & send receipt"}
        </button>
        {sent && (
          <p className="mt-2 animate-fade-up text-center text-sm font-medium text-green-600">
            Receipt {receiptNo} sent to the customer automatically.
          </p>
        )}
      </div>
    </div>
  );
}

function Stepper({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-lg font-semibold text-gray-700 transition hover:border-brand hover:text-brand disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-gray-600">
      <span>{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}
