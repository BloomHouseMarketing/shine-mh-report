import { GoogleAuth } from "google-auth-library";
import { ShineDataRow, ShineKPISummary } from "../types";

// ─── STATIC FALLBACK ────────────────────────────────────────────────────────
// Used only when the Sheets API is unreachable.
// Contains only months that currently have real data.
function buildStaticFallback(): ShineDataRow[] {
  return [
    { month: "Dec 2025", totalCalls: 238, qualifiedCalls: 18, adsLeadsPercent: 22, organicLeadsPercent: 78 },
    { month: "Jan 2026", totalCalls: 245, qualifiedCalls: 10, adsLeadsPercent: 20, organicLeadsPercent: 80 },
    { month: "Feb 2026", totalCalls: 251, qualifiedCalls: 6,  adsLeadsPercent: 34, organicLeadsPercent: 66 },
    { month: "Mar 2026", totalCalls: 168, qualifiedCalls: 5,  adsLeadsPercent: 20, organicLeadsPercent: 80 },
  ];
}

// ─── ROW PARSER ─────────────────────────────────────────────────────────────
// Handles any number of rows — fully dynamic.
// Row with blank month cell → skipped entirely.
// Row with month name but blank data → kept as null row.
function parseSheetRows(rows: string[][]): ShineDataRow[] {
  return rows
    .slice(1) // skip header row
    .map((row): ShineDataRow | null => {
      const month = row[0]?.trim() ?? "";
      if (!month) return null;

      const rawTotal     = row[1]?.trim() ?? "";
      const rawQualified = row[2]?.trim() ?? "";
      const rawAds       = row[3]?.trim().replace("%", "") ?? "";
      const rawOrganic   = row[4]?.trim().replace("%", "") ?? "";

      return {
        month,
        totalCalls:          rawTotal     ? parseInt(rawTotal, 10)     : null,
        qualifiedCalls:      rawQualified ? parseInt(rawQualified, 10) : null,
        adsLeadsPercent:     rawAds       ? parseFloat(rawAds)         : null,
        organicLeadsPercent: rawOrganic   ? parseFloat(rawOrganic)     : null,
      };
    })
    .filter((row): row is ShineDataRow => row !== null);
}

// ─── SERVICE ACCOUNT AUTH ───────────────────────────────────────────────────
// Gets a short-lived access token using the service account credentials.
// The token is used as a Bearer token in the Sheets API request.
// google-auth-library handles token refresh automatically.
async function getAccessToken(): Promise<string> {
  const email      = process.env.GOOGLE_SA_EMAIL;
  const privateKey = process.env.GOOGLE_SA_PRIVATE_KEY;

  if (!email || !privateKey) {
    throw new Error("Missing GOOGLE_SA_EMAIL or GOOGLE_SA_PRIVATE_KEY env vars");
  }

  // Replace escaped newlines from .env.local with real newlines
  const formattedKey = privateKey.replace(/\\n/g, "\n");

  const auth = new GoogleAuth({
    credentials: {
      client_email: email,
      private_key:  formattedKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();

  if (!tokenResponse.token) {
    throw new Error("Service account auth returned no token");
  }

  return tokenResponse.token;
}

// ─── FETCH ───────────────────────────────────────────────────────────────────
// Authenticates via service account, fetches from Sheets API v4.
// Sheet does NOT need to be public — must be shared with the service account email.
// Falls back to static data on any error — never crashes the page.
export async function fetchShineData(): Promise<ShineDataRow[]> {
  try {
    const id = process.env.SHINE_SPREADSHEET_ID;
    if (!id) {
      console.warn("Shine: missing SHINE_SPREADSHEET_ID — using static fallback");
      return buildStaticFallback();
    }

    const token = await getAccessToken();
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Sheet1!A:E`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Sheets API responded with ${res.status}`);

    const json = await res.json();
    const rows: string[][] = json.values ?? [];

    if (rows.length < 2) {
      console.warn("Shine: sheet returned no data rows — using static fallback");
      return buildStaticFallback();
    }

    const parsed = parseSheetRows(rows);
    if (parsed.length === 0) {
      console.warn("Shine: parsed 0 rows — using static fallback");
      return buildStaticFallback();
    }

    return parsed;
  } catch (err) {
    console.error("Shine fetchShineData error:", err);
    return buildStaticFallback();
  }
}

// ─── KPI SUMMARY ─────────────────────────────────────────────────────────────
// Aggregated metrics derived from the full data set.
export function getShineKPISummary(data: ShineDataRow[]): ShineKPISummary {
  const filled = data.filter(r => r.totalCalls !== null);

  const totalCallsSum     = filled.reduce((s, r) => s + (r.totalCalls     ?? 0), 0);
  const qualifiedCallsSum = filled.reduce((s, r) => s + (r.qualifiedCalls ?? 0), 0);

  const adsValues     = filled.map(r => r.adsLeadsPercent).filter((v): v is number => v !== null);
  const organicValues = filled.map(r => r.organicLeadsPercent).filter((v): v is number => v !== null);

  const avg = (arr: number[]) =>
    arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;

  const qualificationRate = totalCallsSum > 0
    ? Math.round((qualifiedCallsSum / totalCallsSum) * 1000) / 10
    : 0;

  const latestRow = filled[filled.length - 1];

  return {
    totalCallsSum,
    qualifiedCallsSum,
    avgAdsPercent:      avg(adsValues),
    avgOrganicPercent:  avg(organicValues),
    qualificationRate,
    latestMonth:        latestRow?.month               ?? "—",
    latestAds:          latestRow?.adsLeadsPercent     ?? 0,
    latestOrganic:      latestRow?.organicLeadsPercent ?? 0,
    monthsWithData:     filled.length,
  };
}
