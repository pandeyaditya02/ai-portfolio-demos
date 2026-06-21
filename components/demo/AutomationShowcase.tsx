"use client";

import { useState } from "react";
import type { AutomationKind, Business } from "@/data/types";
import { BookingForm } from "@/components/automations/BookingForm";
import { ReceiptGenerator } from "@/components/automations/ReceiptGenerator";
import { CRMInbox } from "@/components/automations/CRMInbox";

const TAB_META: Record<AutomationKind, { label: string; icon: string; blurb: string }> = {
  booking: {
    label: "Booking + Confirmation",
    icon: "\u{1F4F2}",
    blurb: "Book an appointment and watch the automated confirmation send instantly.",
  },
  receipt: {
    label: "Auto Receipt",
    icon: "\u{1F9FE}",
    blurb: "Build an order and a branded, itemized receipt generates itself.",
  },
  crm: {
    label: "CRM Pipeline",
    icon: "\u{1F5C2}\uFE0F",
    blurb: "See how every lead is captured and moved through your pipeline.",
  },
};

export function AutomationShowcase({ business }: { business: Business }) {
  const kinds = business.demoAutomations;
  const [active, setActive] = useState<AutomationKind>(kinds[0]);

  return (
    <section id="automations" className="bg-brand-soft/60 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Try it live</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            AI automation, built right in
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            These are working demos. Interact with them to feel exactly what your customers and
            your team would experience.
          </p>
        </div>

        {kinds.length > 1 && (
          <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-2 rounded-full bg-white p-1.5 shadow-sm">
            {kinds.map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => setActive(kind)}
                className={`flex-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active === kind ? "bg-brand text-brand-fg shadow" : "text-gray-600 hover:text-brand"
                }`}
              >
                <span className="mr-1">{TAB_META[kind].icon}</span>
                {TAB_META[kind].label}
              </button>
            ))}
          </div>
        )}

        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-gray-500">
          {TAB_META[active].blurb}
        </p>

        <div className="mx-auto mt-8 max-w-4xl">
          {active === "booking" && <BookingForm business={business} />}
          {active === "receipt" && <ReceiptGenerator business={business} />}
          {active === "crm" && <CRMInbox business={business} />}
        </div>
      </div>
    </section>
  );
}
