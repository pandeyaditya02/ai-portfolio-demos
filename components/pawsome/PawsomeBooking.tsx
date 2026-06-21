"use client";

import { useState } from "react";

type Status = "idle" | "typing" | "sent";

const SERVICES = [
  "Full Groom & Style",
  "Spa Bath & Tidy",
  "Doggy Daycare",
  "Overnight Boarding",
];

export function PawsomeBooking() {
  const [pet, setPet] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const canSubmit = pet.trim() && date && time && status === "idle";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("typing");
    window.setTimeout(() => setStatus("sent"), 1500);
  }

  function reset() {
    setStatus("idle");
    setPet("");
    setDate("");
    setTime("");
  }

  const prettyDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      {/* Form */}
      <form onSubmit={submit} className="pw-glass rounded-[28px] p-7 sm:p-9">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--pw-amber)]">
          Live booking demo
        </div>
        <h3 className="pw-serif mt-3 text-3xl font-semibold text-[var(--pw-cream)]">
          Reserve a pamper session
        </h3>

        <div className="mt-7 space-y-4">
          <PwField label="Pet's name">
            <input
              value={pet}
              onChange={(e) => setPet(e.target.value)}
              placeholder="Bailey"
              className="pw-input"
            />
          </PwField>

          <PwField label="Service">
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="pw-input"
            >
              {SERVICES.map((s) => (
                <option key={s} className="text-black">
                  {s}
                </option>
              ))}
            </select>
          </PwField>

          <div className="grid grid-cols-2 gap-4">
            <PwField label="Date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pw-input"
              />
            </PwField>
            <PwField label="Time">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pw-input"
              />
            </PwField>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            data-magnetic
            className="pw-cta mt-2 w-full justify-center disabled:opacity-40"
          >
            {status === "idle" ? "Confirm booking" : "Booking confirmed"}
          </button>
          {status === "sent" && (
            <button
              type="button"
              onClick={reset}
              className="w-full text-center text-sm text-[var(--pw-cream)]/50 hover:text-[var(--pw-cream)]"
            >
              Run it again
            </button>
          )}
        </div>
      </form>

      {/* Phone */}
      <div className="flex justify-center">
        <div className="w-full max-w-[320px] rounded-[2.6rem] border border-white/10 bg-black/60 p-3 shadow-2xl backdrop-blur">
          <div className="overflow-hidden rounded-[2rem] bg-[#0b1413]">
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg">
                {"\u{1F436}"}
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">Pawsome Grooming</div>
                <div className="text-[11px] text-white/60">WhatsApp Business</div>
              </div>
            </div>

            <div className="flex min-h-[300px] flex-col gap-2 p-4">
              {status === "idle" && (
                <p className="m-auto max-w-[80%] text-center text-xs text-white/40">
                  Confirm a booking and the AI flow sends an instant WhatsApp message.
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
                    <p className="font-semibold">Hi! {"\u{1F436}"} You&rsquo;re all set.</p>
                    <p className="mt-1">
                      <b>{pet || "Your pup"}</b> is booked for <b>{service}</b> on{" "}
                      <b>
                        {prettyDate}, {time}
                      </b>
                      .
                    </p>
                    <p className="mt-1">284 Marina Blvd, San Francisco</p>
                    <Meta />
                  </Bubble>
                  <Bubble delay>
                    <p>We&rsquo;ll send a reminder 24h before. Treats are on us {"\u{1F9B4}"}</p>
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

function PwField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--pw-cream)]/45">
        {label}
      </span>
      {children}
    </label>
  );
}

function Bubble({ children, delay }: { children: React.ReactNode; delay?: boolean }) {
  return (
    <div
      className={`max-w-[85%] animate-fade-up self-end rounded-2xl rounded-br-sm bg-[#dcf8c6] px-3 py-2 text-[12px] leading-snug text-gray-800 ${delay ? "[animation-delay:250ms]" : ""}`}
    >
      {children}
    </div>
  );
}

function Meta() {
  return (
    <span className="mt-1 block text-right text-[9px] text-gray-500">
      sent automatically &middot; WhatsApp {"\u2713\u2713"}
    </span>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-500" />;
}
