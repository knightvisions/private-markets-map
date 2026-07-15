"use client";

import type { Company, Category, CustomerType } from "@/types/company";
import {
  CATEGORIES,
  CUSTOMER_TYPES,
  CATEGORY_COLORS,
  CUSTOMER_COLORS,
} from "@/types/company";

interface MarketMapProps {
  companies: Company[];
  onSelect: (company: Company) => void;
}

function companiesInCell(
  companies: Company[],
  category: Category,
  customer: CustomerType
): Company[] {
  return companies.filter(
    (c) => c.category === category && c.customerTypes.includes(customer)
  );
}

export default function MarketMap({ companies, onSelect }: MarketMapProps) {
  // Only show categories that have at least one company after filters
  const activeCategories = CATEGORIES.filter((cat) =>
    companies.some((c) => c.category === cat)
  );

  if (companies.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-12 text-center">
        <div>
          <p className="text-lg font-medium text-foreground">No companies match</p>
          <p className="mt-1 text-sm text-muted">
            Try clearing filters or adjusting your search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-6">
      <div className="min-w-[720px]">
        {/* Column headers — customer types */}
        <div
          className="mb-2 grid gap-2"
          style={{
            gridTemplateColumns: `160px repeat(${CUSTOMER_TYPES.length}, minmax(140px, 1fr))`,
          }}
        >
          <div />
          {CUSTOMER_TYPES.map((ct) => (
            <div
              key={ct}
              className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-2 py-2.5"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: CUSTOMER_COLORS[ct] }}
              />
              <span className="text-xs font-semibold uppercase tracking-wide text-foreground">
                {ct}
              </span>
            </div>
          ))}
        </div>

        {/* Rows — categories */}
        <div className="space-y-2">
          {activeCategories.map((category) => (
            <div
              key={category}
              className="grid gap-2"
              style={{
                gridTemplateColumns: `160px repeat(${CUSTOMER_TYPES.length}, minmax(140px, 1fr))`,
              }}
            >
              {/* Row label */}
              <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[category] }}
                />
                <span className="text-[11px] font-medium leading-tight text-foreground">
                  {category}
                </span>
              </div>

              {/* Cells */}
              {CUSTOMER_TYPES.map((customer) => {
                const cell = companiesInCell(companies, category, customer);
                return (
                  <div
                    key={`${category}-${customer}`}
                    className="grid-cell rounded-lg border border-border/80 bg-surface/40 p-1.5"
                  >
                    {cell.length === 0 ? (
                      <div className="flex h-full min-h-[72px] items-center justify-center">
                        <span className="text-[10px] text-muted/40">—</span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap content-start gap-1">
                        {cell.map((company) => (
                          <button
                            key={`${company.id}-${customer}`}
                            type="button"
                            onClick={() => onSelect(company)}
                            title={company.oneLiner}
                            className="company-chip max-w-full truncate rounded-md border border-border/60 bg-surface-2 px-2 py-1 text-left text-[11px] font-medium text-foreground hover:border-accent/60"
                            style={{
                              borderLeftWidth: 3,
                              borderLeftColor: CATEGORY_COLORS[category],
                            }}
                          >
                            {company.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-muted">
          Companies serving multiple customer types appear in each applicable
          column. Click a company for full profile.
        </p>
      </div>
    </div>
  );
}
