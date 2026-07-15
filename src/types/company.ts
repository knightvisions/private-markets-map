export type Category =
  | "Cap Table Management"
  | "Fund Administration"
  | "SPV Formation"
  | "Secondary Marketplaces"
  | "LP Portals & IR"
  | "Forward Contracts & Liquidity"
  | "Broker-Dealers"
  | "Data & Analytics"
  | "Compliance & Onboarding"
  | "Portfolio Management"
  | "Fundraising Infrastructure";

export type CustomerType = "GP" | "LP" | "Company" | "Employee";

export type FundingStage =
  | "Bootstrapped"
  | "Seed"
  | "Series A"
  | "Series B"
  | "Series C+"
  | "Public"
  | "Acquired"
  | "Private";

export interface Company {
  id: string;
  name: string;
  oneLiner: string;
  businessModel: string;
  category: Category;
  customerTypes: CustomerType[];
  fundingStage: FundingStage;
  website: string;
  founded?: number;
  hq?: string;
  sources?: string[];
  competitors: string[]; // company ids
}

export const CATEGORIES: Category[] = [
  "Cap Table Management",
  "Fund Administration",
  "SPV Formation",
  "Secondary Marketplaces",
  "LP Portals & IR",
  "Forward Contracts & Liquidity",
  "Broker-Dealers",
  "Data & Analytics",
  "Compliance & Onboarding",
  "Portfolio Management",
  "Fundraising Infrastructure",
];

export const CUSTOMER_TYPES: CustomerType[] = [
  "GP",
  "LP",
  "Company",
  "Employee",
];

export const FUNDING_STAGES: FundingStage[] = [
  "Bootstrapped",
  "Seed",
  "Series A",
  "Series B",
  "Series C+",
  "Public",
  "Acquired",
  "Private",
];

export const CATEGORY_COLORS: Record<Category, string> = {
  "Cap Table Management": "#3b82f6",
  "Fund Administration": "#8b5cf6",
  "SPV Formation": "#06b6d4",
  "Secondary Marketplaces": "#f59e0b",
  "LP Portals & IR": "#10b981",
  "Forward Contracts & Liquidity": "#ec4899",
  "Broker-Dealers": "#ef4444",
  "Data & Analytics": "#6366f1",
  "Compliance & Onboarding": "#14b8a6",
  "Portfolio Management": "#a855f7",
  "Fundraising Infrastructure": "#f97316",
};

export const CUSTOMER_COLORS: Record<CustomerType, string> = {
  GP: "#8b5cf6",
  LP: "#06b6d4",
  Company: "#3b82f6",
  Employee: "#f59e0b",
};
