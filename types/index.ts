// ─── Shine Data Row ──────────────────────────────────────────────────────────
// One row per month from the Google Sheet.
// null means the cell was blank — the month row exists but data is missing.
export interface ShineDataRow {
  month: string;
  totalCalls: number | null;
  qualifiedCalls: number | null;
  adsLeadsPercent: number | null;
  organicLeadsPercent: number | null;
  admission: number | null;
}

// ─── KPI Summary ─────────────────────────────────────────────────────────────
// Aggregated metrics derived from the full data set.
export interface ShineKPISummary {
  totalCallsSum: number;
  qualifiedCallsSum: number;
  avgAdsPercent: number;
  avgOrganicPercent: number;
  qualificationRate: number;
  admissionSum: number;
  admissionRate: number;
  latestMonth: string;
  latestAds: number;
  latestOrganic: number;
  monthsWithData: number;
}
