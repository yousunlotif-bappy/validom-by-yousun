import type { Metadata } from "next";
import "./globals.css";

/*
  Global site metadata.

  This is important for:
  - Browser tab title
  - SEO preview
  - Vercel deployment polish
  - Judge first impression
*/
export const metadata: Metadata = {
  title: "Validom by Yousun — AI Domain Validation Engine",
  description:
    "Validom turns random domains into evidence-backed, trust-scored, launch-ready startup opportunities.",
  keywords: [
    "Validom",
    "Domain Roulette",
    "AI startup validation",
    "domain validation",
    "Devpost",
    "hackathon",
    "startup ideas",
  ],
  authors: [{ name: "Yousun" }],
  creator: "Yousun",
  openGraph: {
    title: "Validom by Yousun",
    description:
      "AI-powered domain-first startup validation engine for turning random domains into launch-ready startup opportunities.",
    type: "website",
    url: "https://validom-by-yousun.vercel.app/",
    siteName: "Validom by Yousun",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

