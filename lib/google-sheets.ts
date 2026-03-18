import { GoogleAuth } from "google-auth-library";

// TODO: Implement Google Sheets data fetching
export async function getSheetData() {
  const auth = new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SA_EMAIL,
      private_key: process.env.GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  // Placeholder
  return [];
}
