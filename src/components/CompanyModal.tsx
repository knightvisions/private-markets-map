"use client";

import { useEffect } from "react";
import type { Company } from "@/types/company";
import {
  CATEGORY_COLORS,
  CUSTOMER_COLORS,
} from "@/types/company";
import { getCompetitors } from "@/data/companies";

interface CompanyModalProps {
  company: Company | null;
  onClose: () => void;
  onSelectCompany: (company: Company) => void;
}

export default function CompanyModal({
  company,
  onClose,
  onSelectCompany,
}: CompanyModalProps) {
  useEffect(() => {
    if (!company) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [company, onClose]);

  if (!company) return null;

  const competitors = getCompetitors(company);
  const color = CATEGORY_COLORS[company.category];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="company-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="animate-scale-in relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface shadow-2xl">
        {/* Header accent */}
        <div
          className="h-1.5 w-full rounded-t-2xl"
          style={{ backgroundColor: color }}
        />

        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
                {company.category}
              </p>
              <h2
                id="company-modal-title"
                className="mt-1 text-2xl font-semibold tracking-tight text-foreground"
              >
                {company.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-2.5 py-1 text-sm text-muted hover:bg-surface-2 hover:text-foreground"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-foreground/90">
            {company.oneLiner}
          </p>

          <div className="mt-5 space-y-4">
            <Section title="Business model">
              <p className="text-sm leading-relaxed text-muted">
                {company.businessModel}
              </p>
            </Section>

            <Section title="Funding status">
              <span className="inline-flex rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {company.fundingStage}
              </span>
              {company.founded && (
                <span className="ml-2 text-xs text-muted">
                  Founded {company.founded}
                  {company.hq ? ` · ${company.hq}` : ""}
                </span>
              )}
            </Section>

            <Section title="Customer type">
              <div className="flex flex-wrap gap-1.5">
                {company.customerTypes.map((ct) => (
                  <span
                    key={ct}
                    className="rounded-md px-2.5 py-1 text-xs font-medium text-white"
                    style={{ backgroundColor: CUSTOMER_COLORS[ct] }}
                  >
                    {ct}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Competitors">
              {competitors.length === 0 ? (
                <p className="text-sm text-muted">No mapped competitors in universe.</p>
              ) : (
                <ul className="flex flex-wrap gap-2">
                  {competitors.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => onSelectCompany(c)}
                        className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                      >
                        {c.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            {company.sources && company.sources.length > 0 && (
              <Section title="Discovery sources">
                <p className="text-xs text-muted">
                  {company.sources.join(" · ")}
                </p>
              </Section>
            )}
          </div>

          <div className="mt-6 flex gap-2">
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110"
            >
              Visit website ↗
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2.5 text-sm text-muted hover:bg-surface-2 hover:text-foreground"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
        {title}
      </h3>
      {children}
    </div>
  );
}
