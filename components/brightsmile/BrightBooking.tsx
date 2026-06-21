"use client";

import { useState } from "react";

type Tab = "booking" | "crm";
type Status = "idle" | "typing" | "sent";

const TREATMENTS = ["New Patient Exam", "Hygiene & Cleaning", "Teeth Whitening", "Invisalign Consult", "Emergency Visit"];

type Lead = { id: number; name: string; detail: string; stage: number; fresh?: boolean };
const STAGES = ["New lead", "Contacted", "Booked", "Treated"];
const SEED: Lead[] = [
  { id: 1, name: "Marcus Reed", detail: "New Patient Exam", stage: 0 },
  { id: 2, name: "Priya Nair", detail: "Invisalign Consult", stage: 1 },
  { id: 3, name: "Tom Becker", detail: "Emergency Visit", stage: 2 },
];
const POOL = ["Alex Monroe", "Riley Chen", "Jamie Brooks", "Casey Flynn", "Dana Wells"];

export function BrightBooking() {
  const [tab, setTab] = useState<Tab>("booking");

  return (
    <div>
      <div className="mx-auto mb-10 flex max-w-sm rounded-full bg-white p-1.5 shadow-sm">
        <TabBtn active={tab === "booking"} onClick={() => setTab("booking")}>
          Booking + SMS
        </TabBtn>
        <TabBtn active={tab === "crm"} onClick={() => setTab("crm")}>
          Patient CRM
        </TabBtn>
      </div>
      {tab === "booking" ? <BookingPanel /> : <CrmPanel />}
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
        active ? "bg-[var(--bsd-ink)] text-white" : "text-[var(--bsd-muted)] hover:text-[var(--bsd-ink)]"
      }`}
    >
      {children}
    </button>
  );
}

/* -------------------------------- Booking -------------------------------- */

function BookingPanel() {
  const [name, setName] = useState("");
  const [treatment, setTreatment] = useState(TREATMENTS[0]);
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
      <form onSubmit={submit} className="bsd-glass rounded-[28px] p-7 sm:p-9">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--bsd-blue)]">Live demo</div>
        <h3 className="bsd-serif mt-3 text-4xl text-[var(--bsd-ink)]">Request an appointment</h3>

        <div className="mt-7 space-y-4">
          <Field label="Full name">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Smith" className="bsd-input" />
          </Field>
          <Field label="Treatment">
            <select value={treatment} onChange={(e) => setTreatment(e.target.value)} className="bsd-input">
              {TREATMENTS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bsd-input" />
            </Field>
            <Field label="Time">
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="bsd-input" />
            </Field>
          </div>
          <button type="submit" disabled={!canSubmit} data-magnetic className="bsd-btn mt-2 w-full justify-center disabled:opacity-40">
            {status === "idle" ? "Request appointment" : "Appointment requested"}
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
              className="w-full text-center text-sm text-[var(--bsd-muted)] hover:text-[var(--bsd-ink)]"
            >
              Run it again
            </button>
          )}
        </div>
      </form>

      {/* phone */}
      <div className="flex justify-center">
        <div className="w-full max-w-[320px] rounded-[2.6rem] border border-black/5 bg-white p-3 shadow-2xl">
          <div className="overflow-hidden rounded-[2rem] bg-[#f4f6fb]">
            <div className="flex items-center justify-center border-b border-black/5 py-3 text-sm font-semibold text-[var(--bsd-ink)]">
              Messages
            </div>
            <div className="flex min-h-[300px] flex-col gap-2 p-4">
              {status === "idle" && (
                <p className="m-auto max-w-[80%] text-center text-xs text-[var(--bsd-muted)]">
                  Request a time and an automated SMS confirmation arrives instantly.
                </p>
              )}
              {status !== "idle" && (
                <div className="self-center rounded-full bg-black/5 px-3 py-1 text-[10px] text-[var(--bsd-muted)]">
                  {prettyDate} &middot; {time}
                </div>
              )}
              {status === "typing" && (
                <div className="flex w-14 items-center gap-1 self-start rounded-2xl rounded-bl-sm bg-white px-3 py-3 shadow-sm">
                  <Dot /> <Dot /> <Dot />
                </div>
              )}
              {status === "sent" && (
                <>
                  <SmsBubble>
                    <b>Bright Smile Dental</b>
                    <br />
                    Hi {first}, your {treatment} is confirmed for {prettyDate} at {time}. Reply C to reschedule.
                  </SmsBubble>
                  <SmsBubble delay>We&rsquo;ll text a reminder 48h before. See you soon! {"\u{1F9B7}"}</SmsBubble>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmsBubble({ children, delay }: { children: React.ReactNode; delay?: boolean }) {
  return (
    <div
      className={`max-w-[85%] animate-fade-up self-start rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-[12px] leading-snug text-[var(--bsd-ink)] shadow-sm ${
        delay ? "[animation-delay:220ms]" : ""
      }`}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- CRM ---------------------------------- */

function CrmPanel() {
  const [leads, setLeads] = useState<Lead[]>(SEED);
  const [nextId, setNextId] = useState(SEED.length + 1);
  const [pool, setPool] = useState(0);

  function addLead() {
    const id = nextId;
    setLeads((l) => [...l, { id, name: POOL[pool % POOL.length], detail: "New inquiry", stage: 0, fresh: true }]);
    setNextId((n) => n + 1);
    setPool((p) => p + 1);
    window.setTimeout(() => setLeads((l) => l.map((x) => (x.id === id ? { ...x, fresh: false } : x))), 1000);
  }

  function advance(id: number) {
    setLeads((l) => l.map((x) => (x.id === id ? { ...x, stage: Math.min(x.stage + 1, STAGES.length - 1) } : x)));
  }

  return (
    <div className="bsd-glass rounded-[28px] p-5 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="bsd-serif text-3xl text-[var(--bsd-ink)]">Patient pipeline</h3>
          <p className="text-sm text-[var(--bsd-muted)]">Every inquiry is captured and followed up automatically.</p>
        </div>
        <button type="button" onClick={addLead} data-magnetic className="bsd-btn !px-5 !py-2.5">
          + New lead
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STAGES.map((stage, sIdx) => {
          const here = leads.filter((l) => l.stage === sIdx);
          return (
            <div key={stage} className="rounded-2xl bg-white/60 p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-[var(--bsd-muted)]">{stage}</span>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--bsd-blue)] px-1.5 text-[11px] font-bold text-white">
                  {here.length}
                </span>
              </div>
              <div className="space-y-2">
                {here.map((card) => (
                  <div
                    key={card.id}
                    className={`rounded-xl border bg-white p-3 shadow-sm ${card.fresh ? "animate-fade-up ring-2 ring-[var(--bsd-blue)]" : "border-black/5"}`}
                  >
                    <div className="text-sm font-semibold text-[var(--bsd-ink)]">{card.name}</div>
                    <div className="mt-0.5 text-xs text-[var(--bsd-muted)]">{card.detail}</div>
                    {sIdx < STAGES.length - 1 && (
                      <button
                        type="button"
                        onClick={() => advance(card.id)}
                        className="mt-2 w-full rounded-lg border border-black/10 py-1 text-[11px] font-semibold text-[var(--bsd-muted)] transition hover:border-[var(--bsd-blue)] hover:text-[var(--bsd-blue)]"
                      >
                        Move to {STAGES[sIdx + 1]} &rarr;
                      </button>
                    )}
                  </div>
                ))}
                {here.length === 0 && <p className="py-4 text-center text-[11px] text-black/20">Empty</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------- helpers -------------------------------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--bsd-muted)]">{label}</span>
      {children}
    </label>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--bsd-muted)]" />;
}
