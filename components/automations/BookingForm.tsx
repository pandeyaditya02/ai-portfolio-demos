"use client";

import { useState } from "react";
import type { Business } from "@/data/types";

type Status = "idle" | "sending" | "typing" | "sent";

export function BookingForm({ business }: { business: Business }) {
  const isWhatsApp = business.bookingChannel === "WhatsApp";
  const [name, setName] = useState("");
  const [service, setService] = useState(business.services[0]?.name ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const canSubmit = name.trim() && service && date && time && status === "idle";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    setTimeout(() => setStatus("typing"), 700);
    setTimeout(() => setStatus("sent"), 2000);
  }

  function reset() {
    setStatus("idle");
    setName("");
    setDate("");
    setTime("");
    setService(business.services[0]?.name ?? "");
  }

  const firstName = name.trim().split(" ")[0] || "there";
  const prettyDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* The form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <h4 className="text-lg font-bold text-gray-900">{business.bookingCtaLabel}</h4>
        <p className="mt-1 text-sm text-gray-500">
          Fill this in and watch the automated confirmation fire.
        </p>

        <div className="mt-5 space-y-4">
          <Field label="Your name">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jordan Smith"
              className="input"
            />
          </Field>

          <Field label="Service">
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="input"
            >
              {business.services.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Time">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "idle" ? business.bookingCtaLabel : "Booking confirmed"}
          </button>
          {status !== "idle" && (
            <button
              type="button"
              onClick={reset}
              className="w-full text-center text-sm font-medium text-gray-500 hover:text-brand"
            >
              Try again
            </button>
          )}
        </div>
      </form>

      {/* The simulated phone */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[300px] rounded-[2.2rem] border-[10px] border-gray-900 bg-gray-900 shadow-2xl">
          <div className="overflow-hidden rounded-[1.5rem] bg-[#e5ddd5]">
            {/* phone header */}
            <div
              className="flex items-center gap-3 px-4 py-3 text-white"
              style={{ background: isWhatsApp ? "#075E54" : "#1f2937" }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">
                {business.logoEmoji}
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold">{business.name}</div>
                <div className="text-[11px] text-white/70">
                  {isWhatsApp ? "WhatsApp Business" : "SMS"}
                </div>
              </div>
            </div>

            {/* messages */}
            <div className="scroll-thin flex h-[320px] flex-col gap-2 overflow-y-auto p-3">
              {status === "idle" && (
                <p className="m-auto px-6 text-center text-xs text-gray-500">
                  Your automated confirmation will appear here the instant a booking is made.
                </p>
              )}

              {(status === "sending" || status === "typing" || status === "sent") && (
                <div className="self-center rounded-full bg-white/70 px-3 py-1 text-[10px] text-gray-600">
                  {prettyDate} &middot; {time}
                </div>
              )}

              {status === "typing" && (
                <TypingBubble color={isWhatsApp ? "#dcf8c6" : "#ffffff"} />
              )}

              {status === "sent" && (
                <>
                  <Bubble color={isWhatsApp ? "#dcf8c6" : "#ffffff"}>
                    <p className="font-semibold">Hi {firstName}! &#x2705;</p>
                    <p className="mt-1">
                      Your booking for <b>{service}</b> is confirmed for{" "}
                      <b>
                        {prettyDate} at {time}
                      </b>
                      .
                    </p>
                    <p className="mt-1">{business.name}</p>
                    <p className="mt-1">{business.contact.address}</p>
                    <span className="mt-1 block text-[10px] text-gray-500">
                      Reply <b>C</b> to cancel or reschedule.
                    </span>
                    <Meta isWhatsApp={isWhatsApp} />
                  </Bubble>
                  <Bubble color={isWhatsApp ? "#dcf8c6" : "#ffffff"} delay>
                    <p>We&rsquo;ll send a reminder 24 hours before. See you soon! {business.logoEmoji}</p>
                    <Meta isWhatsApp={isWhatsApp} />
                  </Bubble>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 bg-[#f0f0f0] px-3 py-2">
              <div className="flex-1 rounded-full bg-white px-3 py-1.5 text-xs text-gray-400">
                Message
              </div>
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-white"
                style={{ background: isWhatsApp ? "#25D366" : "#3b82f6" }}
              >
                &#10148;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function Bubble({
  children,
  color,
  delay,
}: {
  children: React.ReactNode;
  color: string;
  delay?: boolean;
}) {
  return (
    <div
      className={`max-w-[85%] animate-fade-up self-end rounded-xl rounded-br-sm px-3 py-2 text-[12px] leading-snug text-gray-800 shadow ${delay ? "[animation-delay:250ms]" : ""}`}
      style={{ background: color }}
    >
      {children}
    </div>
  );
}

function TypingBubble({ color }: { color: string }) {
  return (
    <div
      className="flex max-w-[60px] animate-fade-up items-center gap-1 self-end rounded-xl rounded-br-sm px-3 py-2.5 shadow"
      style={{ background: color }}
    >
      <Dot /> <Dot /> <Dot />
    </div>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400" />;
}

function Meta({ isWhatsApp }: { isWhatsApp: boolean }) {
  return (
    <span className="mt-1 block text-right text-[9px] text-gray-400">
      sent automatically &middot; {isWhatsApp ? "WhatsApp" : "SMS"} {isWhatsApp ? "\u2713\u2713" : ""}
    </span>
  );
}
