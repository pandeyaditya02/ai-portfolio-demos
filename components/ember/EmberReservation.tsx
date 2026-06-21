"use client";

import { useMemo, useState } from "react";
import { receiptItems, reservationServices } from "./data";

type Tab = "reserve" | "receipt";
type Status = "idle" | "typing" | "sent";

export function EmberReservation() {
  const [tab, setTab] = useState<Tab>("reserve");
  return (
    <div>
      <div className="mx-auto mb-10 flex max-w-sm rounded-full border border-white/10 bg-black/30 p-1.5">
        <TabBtn active={tab === "reserve"} onClick={() => setTab("reserve")}>
          Reserve + WhatsApp
        </TabBtn>
        <TabBtn active={tab === "receipt"} onClick={() => setTab("receipt")}>
          The bill
        </TabBtn>
      </div>
      {tab === "reserve" ? <ReservePanel /> : <ReceiptPanel />}
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-magnetic
      className={`flex-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
        active ? "bg-[var(--em-ember)] text-[#1a0d07]" : "text-[var(--em-cream)]/60 hover:text-[var(--em-cream)]"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------- Reserve --------------------------------- */

function ReservePanel() {
  const [name, setName] = useState("");
  const [table, setTable] = useState(reservationServices[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const canSubmit = name.trim() && date && time && status === "idle";
  const first = name.trim().split(" ")[0] || "there";
  const prettyDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    : "";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("typing");
    window.setTimeout(() => setStatus("sent"), 1400);
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <form onSubmit={submit} className="em-glass rounded-[28px] p-7 sm:p-9">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--em-gold)]">Live demo</div>
        <h3 className="em-serif mt-3 text-4xl text-[var(--em-cream)]">Pull up a chair</h3>
        <div className="mt-7 space-y-4">
          <Field label="Name">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Smith" className="em-input" />
          </Field>
          <Field label="Table">
            <select value={table} onChange={(e) => setTable(e.target.value)} className="em-input">
              {reservationServices.map((s) => (
                <option key={s} className="text-black">
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="em-input" />
            </Field>
            <Field label="Time">
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="em-input" />
            </Field>
          </div>
          <button type="submit" disabled={!canSubmit} data-magnetic className="em-btn mt-2 w-full justify-center disabled:opacity-40">
            {status === "idle" ? "Reserve a table" : "Table reserved"}
          </button>
          {status === "sent" && (
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setName("");
                setDate("");
                setTime("");
              }}
              className="w-full text-center text-sm text-[var(--em-cream)]/50 hover:text-[var(--em-cream)]"
            >
              Run it again
            </button>
          )}
        </div>
      </form>

      <div className="flex justify-center">
        <div className="w-full max-w-[320px] rounded-[2.6rem] border border-white/10 bg-black/60 p-3 shadow-2xl">
          <div className="overflow-hidden rounded-[2rem] bg-[#0b1413]">
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg">{"\u{1F525}"}</span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">Olive &amp; Ember</div>
                <div className="text-[11px] text-white/60">WhatsApp Business</div>
              </div>
            </div>
            <div className="flex min-h-[300px] flex-col gap-2 p-4">
              {status === "idle" && (
                <p className="m-auto max-w-[80%] text-center text-xs text-white/40">
                  Reserve a table and an instant WhatsApp confirmation arrives.
                </p>
              )}
              {status !== "idle" && (
                <div className="self-center rounded-full bg-white/10 px-3 py-1 text-[10px] text-white/50">
                  {prettyDate} &middot; {time}
                </div>
              )}
              {status === "typing" && (
                <div className="flex w-14 items-center gap-1 self-end rounded-2xl rounded-br-sm bg-[#dcf8c6] px-3 py-3">
                  <Dot /> <Dot /> <Dot />
                </div>
              )}
              {status === "sent" && (
                <>
                  <Bubble>
                    <p className="font-semibold">Table&rsquo;s set, {first}. {"\u{1F525}"}</p>
                    <p className="mt-1">
                      <b>{table}</b> on{" "}
                      <b>
                        {prettyDate} at {time}
                      </b>
                      . 1408 Pike Pl, Seattle.
                    </p>
                    <Meta />
                  </Bubble>
                  <Bubble delay>
                    <p>We&rsquo;ll hold it 15 minutes. Reply C to change anything.</p>
                    <Meta />
                  </Bubble>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Receipt --------------------------------- */

const TAX = 0.101;

function ReceiptPanel() {
  const [qty, setQty] = useState<Record<string, number>>({ "Wood-Fired Margherita": 1, "Ember Steak Frites": 1 });
  const [sent, setSent] = useState(false);

  const lines = receiptItems.map((it) => ({ ...it, count: qty[it.name] ?? 0 })).filter((it) => it.count > 0);
  const subtotal = lines.reduce((s, it) => s + it.price * it.count, 0);
  const tax = subtotal * TAX;
  const total = subtotal + tax;
  const receiptNo = useMemo(() => `#${Math.floor(1000 + Math.random() * 9000)}`, []);
  const fmt = (n: number) => `$${n.toFixed(2)}`;

  const setCount = (name: string, next: number) => {
    setSent(false);
    setQty((q) => ({ ...q, [name]: Math.max(0, next) }));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="em-glass rounded-[28px] p-6 sm:p-8">
        <h3 className="em-serif text-3xl text-[var(--em-cream)]">Build the table&rsquo;s order</h3>
        <p className="mt-1 text-sm text-[var(--em-cream)]/50">An itemized receipt generates and sends itself.</p>
        <div className="mt-6 space-y-3">
          {receiptItems.map((it) => {
            const count = qty[it.name] ?? 0;
            return (
              <div key={it.name} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 p-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-[var(--em-cream)]">{it.name}</div>
                  <div className="text-xs text-[var(--em-cream)]/50">{fmt(it.price)}</div>
                </div>
                <div className="flex flex-none items-center gap-2">
                  <Step onClick={() => setCount(it.name, count - 1)} disabled={count === 0}>
                    &minus;
                  </Step>
                  <span className="w-6 text-center text-sm font-semibold">{count}</span>
                  <Step onClick={() => setCount(it.name, count + 1)}>+</Step>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="relative flex-1 overflow-hidden rounded-[28px] bg-[#15100c] p-6 ring-1 ring-white/10">
          <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: "linear-gradient(90deg, var(--em-coal), var(--em-gold))" }} />
          <div className="flex items-start justify-between border-b border-dashed border-white/15 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{"\u{1F525}"}</span>
              <span className="em-serif text-xl text-[var(--em-cream)]">Olive &amp; Ember</span>
            </div>
            <div className="text-right text-xs text-[var(--em-cream)]/50">
              <div className="font-semibold text-[var(--em-cream)]/80">Receipt {receiptNo}</div>
              <div>Table 12</div>
            </div>
          </div>
          <div className="min-h-[150px] py-4">
            {lines.length === 0 ? (
              <p className="py-12 text-center text-sm text-[var(--em-cream)]/40">Add a dish to start the bill.</p>
            ) : (
              <table className="w-full text-sm">
                <tbody>
                  {lines.map((it) => (
                    <tr key={it.name} className="animate-fade-up">
                      <td className="py-1.5 text-[var(--em-cream)]/80">
                        {it.name}
                        <span className="text-[var(--em-cream)]/40"> &times;{it.count}</span>
                      </td>
                      <td className="py-1.5 text-right font-medium text-[var(--em-cream)]">{fmt(it.price * it.count)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="space-y-1.5 border-t border-dashed border-white/15 pt-4 text-sm">
            <Row label="Subtotal" value={fmt(subtotal)} />
            <Row label={`Tax (${(TAX * 100).toFixed(1)}%)`} value={fmt(tax)} />
            <div className="flex justify-between pt-1 text-base font-bold text-[var(--em-cream)]">
              <span>Total</span>
              <span style={{ color: "var(--em-gold)" }}>{fmt(total)}</span>
            </div>
          </div>
          <p className="mt-4 text-center text-[11px] text-[var(--em-cream)]/40">Auto-generated &middot; emailed &amp; texted to the table</p>
        </div>
        <button
          type="button"
          disabled={lines.length === 0}
          onClick={() => setSent(true)}
          data-magnetic
          className="em-btn mt-4 w-full justify-center disabled:opacity-40"
        >
          {sent ? "Receipt sent \u2713" : "Send digital receipt"}
        </button>
        {sent && <p className="mt-2 animate-fade-up text-center text-sm font-medium text-[var(--em-gold)]">Receipt {receiptNo} sent automatically.</p>}
      </div>
    </div>
  );
}

/* ------------------------------- helpers --------------------------------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--em-cream)]/45">{label}</span>
      {children}
    </label>
  );
}

function Bubble({ children, delay }: { children: React.ReactNode; delay?: boolean }) {
  return (
    <div
      className={`max-w-[85%] animate-fade-up self-end rounded-2xl rounded-br-sm bg-[#dcf8c6] px-3 py-2 text-[12px] leading-snug text-gray-800 ${
        delay ? "[animation-delay:250ms]" : ""
      }`}
    >
      {children}
    </div>
  );
}

function Meta() {
  return <span className="mt-1 block text-right text-[9px] text-gray-500">sent automatically &middot; WhatsApp {"\u2713\u2713"}</span>;
}

function Dot() {
  return <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-500" />;
}

function Step({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-lg font-semibold text-[var(--em-cream)] transition hover:border-[var(--em-ember)] hover:text-[var(--em-ember)] disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[var(--em-cream)]/60">
      <span>{label}</span>
      <span className="font-medium text-[var(--em-cream)]/85">{value}</span>
    </div>
  );
}
