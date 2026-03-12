import type { Metadata } from "next";
import { Inter, Scheherazade_New } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const scheherazade = Scheherazade_New({
  weight: ["400", "600", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-arabic-uthmani",
});

export const metadata: Metadata = {
  title: "Qur'an Ayah Map",
  description: "Visual interactive ayah map for each surah of the Qur'an",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${scheherazade.variable}`}>
      <body className="min-h-screen font-sans text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
