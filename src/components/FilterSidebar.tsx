"use client";

import {
  CATEGORIES,
  CUSTOMER_TYPES,
  FUNDING_STAGES,
  CATEGORY_COLORS,
  CUSTOMER_COLORS,
  type Category,
  type CustomerType,
  type FundingStage,
} from "@/types/company";

export interface Filters {
  categories: Category[];
  customerTypes: CustomerType[];
  fundingStages: FundingStage[];
  search: string;
}

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  totalCount: number;
  filteredCount: number;
  open: boolean;
  onToggle: () => void;
}

function toggleItem<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export default function FilterSidebar({
  filters,
  onChange,
  totalCount,
  filteredCount,
  open,
  onToggle,
}: FilterSidebarProps) {
  const clearAll = () =>
    onChange({
      categories: [],
      customerTypes: [],
      fundingStages: [],
      search: "",
    });

  const hasFilters =
    filters.categories.length > 0 ||
    filters.customerTypes.length > 0 ||
    filters.fundingStages.length > 0 ||
    filters.search.length > 0;

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={onToggle}
        className="lg:hidden fixed bottom-4 right-4 z-40 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/40"
      >
        {open ? "Close filters" : "Filters"}
      </button>

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-72 shrink-0 border-r border-border bg-surface/95 backdrop-blur-md
          transition-transform duration-200 lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
        `}
      >
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
              Filters
            </h2>
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-accent hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <p className="mt-1 text-xs text-muted">
            Showing{" "}
            <span className="font-medium text-foreground">{filteredCount}</span> of{" "}
            {totalCount} companies
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Search */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted">
              Search
            </label>
            <input
              type="search"
              value={filters.search}
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
              placeholder="Company name or keyword…"
              className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground placeholder:text-muted/60 outline-none focus:border-accent"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted">
              Category
            </label>
            <div className="space-y-1.5">
              {CATEGORIES.map((cat) => {
                const active = filters.categories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...filters,
                        categories: toggleItem(filters.categories, cat),
                      })
                    }
                    className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                      active
                        ? "bg-surface-2 text-foreground"
                        : "text-muted hover:bg-surface-2/60 hover:text-foreground"
                    }`}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: CATEGORY_COLORS[cat],
                        opacity: active || filters.categories.length === 0 ? 1 : 0.4,
                      }}
                    />
                    <span className="leading-snug">{cat}</span>
                    {active && (
                      <span className="ml-auto text-[10px] text-accent">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer type */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted">
              Customer type
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {CUSTOMER_TYPES.map((ct) => {
                const active = filters.customerTypes.includes(ct);
                return (
                  <button
                    key={ct}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...filters,
                        customerTypes: toggleItem(filters.customerTypes, ct),
                      })
                    }
                    className={`rounded-md border px-2 py-2 text-xs font-medium transition-colors ${
                      active
                        ? "border-transparent text-white"
                        : "border-border text-muted hover:border-border hover:text-foreground"
                    }`}
                    style={
                      active
                        ? { backgroundColor: CUSTOMER_COLORS[ct] }
                        : undefined
                    }
                  >
                    {ct}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-muted">
              GP = fund managers · LP = limited partners · Company = issuers ·
              Employee = shareholders/staff
            </p>
          </div>

          {/* Funding stage */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted">
              Funding stage
            </label>
            <div className="flex flex-wrap gap-1.5">
              {FUNDING_STAGES.map((stage) => {
                const active = filters.fundingStages.includes(stage);
                return (
                  <button
                    key={stage}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...filters,
                        fundingStages: toggleItem(filters.fundingStages, stage),
                      })
                    }
                    className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                      active
                        ? "border-accent bg-accent/15 text-accent"
                        : "border-border text-muted hover:text-foreground"
                    }`}
                  >
                    {stage}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-border p-3 text-[10px] leading-relaxed text-muted">
          Data compiled from public sources including Crunchbase coverage, YC
          directory, company sites, and private-markets VC portfolio mappings.
          Best-effort as of 2026 — not investment advice.
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onToggle}
          aria-hidden
        />
      )}
    </>
  );
}
