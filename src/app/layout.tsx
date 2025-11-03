import type { Metadata } from "next";
import "./globals.css";
import "@/styles/main.scss";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

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
    <html lang="en">
      <body className="antialiased">
        <SiteHeader /> {/* 課題25-SiteHeaderの追加 */}
        {children}
        <SiteFooter /> {/* 課題26-SiteFooterの追加 */}
      </body>
    </html>
  );
}
