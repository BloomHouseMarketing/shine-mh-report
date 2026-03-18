// Shared type definitions

export interface SheetRow {
  // TODO: Define based on actual spreadsheet columns
  [key: string]: string | number;
}

export interface DashboardData {
  rows: SheetRow[];
}
