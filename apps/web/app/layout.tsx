import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LiveTicker from "@/components/layout/LiveTicker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hashim Ali Mir | Solutions Architect & AI Engineer",
  description: "Portfolio showcasing AI Copilots, Zero-Knowledge Proofs, and Systems Architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth h-screen w-screen overflow-hidden">
      <body className={`${inter.className} bg-black text-neutral-200 antialiased h-screen w-screen overflow-hidden flex flex-col`}>
        <div className="flex-none z-50">
           <LiveTicker />
        </div>
        <main className="flex-1 relative overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}