import type { Metadata } from "next";
import "./globals.css";
import "@/styles/main.scss";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
