"use client";

import { useState } from "react";
import type { Business, CrmLead } from "@/data/types";

type Card = CrmLead & { id: number; stage: number; fresh?: boolean };

const CHANNEL_STYLE: Record<CrmLead["channel"], string> = {
  WhatsApp: "bg-green-100 text-green-700",
  SMS: "bg-blue-100 text-blue-700",
  Email: "bg-purple-100 text-purple-700",
  "Web form": "bg-amber-100 text-amber-700",
  Phone: "bg-gray-100 text-gray-700",
};

const NEW_LEAD_POOL: CrmLead[] = [
  { name: "Alex Morgan", detail: "New inquiry", value: "Hot lead", channel: "Web form" },
  { name: "Riley Chen", detail: "New inquiry", value: "Hot lead", channel: "WhatsApp" },
  { name: "Jamie Brooks", detail: "New inquiry", value: "Hot lead", channel: "SMS" },
  { name: "Taylor Reed", detail: "New inquiry", value: "Hot lead", channel: "Email" },
  { name: "Casey Flynn", detail: "New inquiry", value: "Hot lead", channel: "Phone" },
];

export function CRMInbox({ business }: { business: Business }) {
  const stages = business.crmStages;
  const [cards, setCards] = useState<Card[]>(() =>
    business.crmLeads.map((lead, i) => ({
      ...lead,
      id: i,
      // spread initial leads across the first stages
      stage: Math.min(i, stages.length - 2),
    })),
  );
  const [nextId, setNextId] = useState(business.crmLeads.length);
  const [poolIdx, setPoolIdx] = useState(0);

  function addLead() {
    const template = NEW_LEAD_POOL[poolIdx % NEW_LEAD_POOL.length];
    setCards((c) => [...c, { ...template, id: nextId, stage: 0, fresh: true }]);
    setNextId((n) => n + 1);
    setPoolIdx((p) => p + 1);
    setTimeout(() => {
      setCards((c) => c.map((card) => (card.id === nextId ? { ...card, fresh: false } : card)));
    }, 1200);
  }

  function advance(id: number) {
    setCards((c) =>
      c.map((card) =>
        card.id === id ? { ...card, stage: Math.min(card.stage + 1, stages.length - 1) } : card,
      ),
    );
  }

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-lg font-bold text-gray-900">Live CRM pipeline</h4>
          <p className="text-sm text-gray-500">
            Every lead lands here automatically. Move a card to see the flow.
          </p>
        </div>
        <button type="button" onClick={addLead} className="btn-primary !px-5 !py-2.5">
          + Simulate new lead
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stages.map((stage, sIdx) => {
          const stageCards = cards.filter((c) => c.stage === sIdx);
          return (
            <div key={stage} className="rounded-2xl bg-gray-50 p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-600">
                  {stage}
                </span>
                <span
                  className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold text-white"
                  style={{ background: business.theme.brand }}
                >
                  {stageCards.length}
                </span>
              </div>
              <div className="space-y-2">
                {stageCards.map((card) => (
                  <div
                    key={card.id}
                    className={`rounded-xl border bg-white p-3 shadow-sm transition ${card.fresh ? "animate-fade-up ring-2" : "border-gray-100"}`}
                    style={card.fresh ? { borderColor: business.theme.brand } : undefined}
                  >
                    <div className="text-sm font-semibold leading-tight text-gray-900">
                      {card.name}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500">{card.detail}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${CHANNEL_STYLE[card.channel]}`}
                      >
                        {card.channel}
                      </span>
                      <span className="text-[11px] font-bold text-gray-700">{card.value}</span>
                    </div>
                    {sIdx < stages.length - 1 && (
                      <button
                        type="button"
                        onClick={() => advance(card.id)}
                        className="mt-2 w-full rounded-lg border border-gray-200 py-1 text-[11px] font-semibold text-gray-600 transition hover:border-brand hover:text-brand"
                      >
                        Move to {stages[sIdx + 1]} &rarr;
                      </button>
                    )}
                  </div>
                ))}
                {stageCards.length === 0 && (
                  <p className="py-4 text-center text-[11px] text-gray-300">Empty</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[11px] text-gray-400">
        Demo data &middot; in production this syncs with your real bookings, forms, and messages.
      </p>
    </div>
  );
}
