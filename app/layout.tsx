import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shine Mental Health | Bloomhouse Marketing",
  description:
    "Call performance and lead source analytics for Shine Mental Health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen font-body bg-brand-pageBg text-brand-black">
        <Header />
        <div className="max-w-[1280px] mx-auto px-6">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
