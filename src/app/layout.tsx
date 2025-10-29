import type { Metadata } from "next";
import "./globals.css";
import "@/styles/main.scss";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Next.js + Tailwind + SCSS Sample",
  description:
    "Sample site demonstrating the coding guidelines for combining Tailwind CSS and structured SCSS in Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
