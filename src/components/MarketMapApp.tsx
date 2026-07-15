"use client";

import { useMemo, useState } from "react";
import { companies } from "@/data/companies";
import type { Company } from "@/types/company";
import FilterSidebar, { type Filters } from "./FilterSidebar";
import MarketMap from "./MarketMap";
import CompanyModal from "./CompanyModal";
import { CATEGORY_COLORS, CATEGORIES } from "@/types/company";

const initialFilters: Filters = {
  categories: [],
  customerTypes: [],
  fundingStages: [],
  search: "",
};

export default function MarketMapApp() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [selected, setSelected] = useState<Company | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<"map" | "list">("map");

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return companies.filter((c) => {
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(c.category)
      ) {
        return false;
      }
      if (
        filters.customerTypes.length > 0 &&
        !c.customerTypes.some((t) => filters.customerTypes.includes(t))
      ) {
        return false;
      }
      if (
        filters.fundingStages.length > 0 &&
        !filters.fundingStages.includes(c.fundingStage)
      ) {
        return false;
      }
      if (q) {
        const hay = [
          c.name,
          c.oneLiner,
          c.businessModel,
          c.category,
          c.hq ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [filters]);

  // Stats for header
  const categoryCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of companies) {
      m.set(c.category, (m.get(c.category) ?? 0) + 1);
    }
    return m;
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#5b8def] to-[#8b5cf6] text-sm font-bold text-white shadow-md shadow-blue-900/30">
              PM
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                Private Markets Infrastructure Map
              </h1>
              <p className="text-[11px] text-muted sm:text-xs">
                Cap tables · Fund admin · SPVs · Secondaries · LP portals ·
                Liquidity · Compliance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 rounded-lg border border-border bg-surface p-0.5 sm:flex">
              <button
                type="button"
                onClick={() => setView("map")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  view === "map"
                    ? "bg-surface-2 text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                2D Map
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  view === "list"
                    ? "bg-surface-2 text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                List
              </button>
            </div>
            <div className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-muted">
              <span className="font-semibold text-foreground">
                {companies.length}
              </span>{" "}
              companies
            </div>
          </div>
        </div>

        {/* Category legend strip */}
        <div className="flex gap-3 overflow-x-auto border-t border-border/60 px-4 py-2 lg:px-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat}
              className="flex shrink-0 items-center gap-1.5 text-[10px] text-muted"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[cat] }}
              />
              <span>
                {cat.split(" ")[0]}
                <span className="ml-1 opacity-60">
                  ({categoryCounts.get(cat) ?? 0})
                </span>
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          totalCount={companies.length}
          filteredCount={filtered.length}
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((o) => !o)}
        />

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Mobile view toggle */}
          <div className="flex items-center gap-1 border-b border-border p-2 sm:hidden">
            <button
              type="button"
              onClick={() => setView("map")}
              className={`flex-1 rounded-md px-3 py-2 text-xs font-medium ${
                view === "map" ? "bg-surface-2 text-foreground" : "text-muted"
              }`}
            >
              2D Map
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              className={`flex-1 rounded-md px-3 py-2 text-xs font-medium ${
                view === "list" ? "bg-surface-2 text-foreground" : "text-muted"
              }`}
            >
              List
            </button>
          </div>

          {view === "map" ? (
            <MarketMap companies={filtered} onSelect={setSelected} />
          ) : (
            <CompanyList companies={filtered} onSelect={setSelected} />
          )}
        </main>
      </div>

      <CompanyModal
        company={selected}
        onClose={() => setSelected(null)}
        onSelectCompany={setSelected}
      />
    </div>
  );
}

function CompanyList({
  companies: list,
  onSelect,
}: {
  companies: Company[];
  onSelect: (c: Company) => void;
}) {
  if (list.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-12 text-center">
        <div>
          <p className="text-lg font-medium">No companies match</p>
          <p className="mt-1 text-sm text-muted">Try adjusting filters.</p>
        </div>
      </div>
    );
  }

  const sorted = [...list].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-6">
      <div className="mx-auto grid max-w-5xl gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {sorted.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c)}
            className="animate-fade-in company-chip rounded-xl border border-border bg-surface p-4 text-left hover:border-accent/50"
            style={{
              borderLeftWidth: 3,
              borderLeftColor: CATEGORY_COLORS[c.category],
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground">{c.name}</h3>
              <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] text-muted">
                {c.fundingStage}
              </span>
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
              {c.oneLiner}
            </p>
            <div className="mt-3 flex flex-wrap gap-1">
              <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted">
                {c.category}
              </span>
              {c.customerTypes.map((t) => (
                <span
                  key={t}
                  className="rounded px-1.5 py-0.5 text-[10px] text-white/90"
                  style={{
                    backgroundColor: CATEGORY_COLORS[c.category],
                    opacity: 0.85,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
