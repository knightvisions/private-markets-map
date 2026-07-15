# Private Markets Infrastructure Map

Interactive market map of the **private markets infrastructure** software landscape.

## Live app

**https://knightvisions.github.io/private-markets-map/**

## Features

- **2D market map** — category (rows) × customer type (columns: GP, LP, Company, Employee)
- **Company profile cards** — one-liner, business model, funding stage, customer types, competitor list
- **Filters** — category, customer type, funding stage, free-text search
- **108 companies** curated from Crunchbase, YC batches, and private-markets-focused VC portfolios

## Categories covered

Cap table management, fund administration, SPV formation, secondary marketplaces, LP portals & IR, forward contracts & employee liquidity, broker-dealers, data & analytics, compliance & onboarding, portfolio management, fundraising infrastructure.

## Develop

```bash
npm install
npm run dev
```

Static site (GitHub Pages) lives in `/docs`. Next.js app is the primary codebase in `src/`.

## Data notes

Company attributes are best-effort as of mid-2026 and may lag real-time fundraising. Not investment advice.
