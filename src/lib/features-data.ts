export type FeatureStatus = "under-review" | "planned" | "in-progress" | "shipped";

export type FeatureCategory = 
  | "acoustics"
  | "dial-ux"
  | "presets"
  | "desktop"
  | "analytics"
  | "integrations";

export interface FeatureIdea {
  id: string;
  title: string;
  description: string;
  category: FeatureCategory;
  status: FeatureStatus;
  votes: number;
  milestone?: string;
  author: string;
  createdAt: string;
  isOfficial?: boolean;
}

export const CATEGORY_CONFIG: Record<FeatureCategory, { label: string; code: string; color: string }> = {
  acoustics: { label: "Acoustics & Sound", code: "ACOUSTIC", color: "#ff4400" },
  "dial-ux": { label: "Dial & Timer UX", code: "DIAL_UX", color: "#00b4d8" },
  presets: { label: "Workflows & Presets", code: "PRESETS", color: "#f59e0b" },
  desktop: { label: "Desktop & System", code: "DESKTOP", color: "#10b981" },
  analytics: { label: "Deep Work Analytics", code: "ANALYTICS", color: "#8b5cf6" },
  integrations: { label: "Local Integrations", code: "INTEGRATE", color: "#ec4899" },
};

export const STATUS_CONFIG: Record<FeatureStatus, { label: string; tag: string; badgeClass: string }> = {
  "under-review": {
    label: "Under Consideration",
    tag: "[01] UNDER_REVIEW",
    badgeClass: "bg-zinc-100 text-zinc-800 border-zinc-400",
  },
  planned: {
    label: "Planned for Next Sprint",
    tag: "[02] PLANNED",
    badgeClass: "bg-amber-100 text-amber-900 border-amber-500",
  },
  "in-progress": {
    label: "Currently in Engineering",
    tag: "[03] IN_PROGRESS",
    badgeClass: "bg-cyan-100 text-cyan-900 border-cyan-500",
  },
  shipped: {
    label: "Shipped in v1.x",
    tag: "[04] SHIPPED",
    badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-500",
  },
};

export const INITIAL_FEATURE_IDEAS: FeatureIdea[] = [];
