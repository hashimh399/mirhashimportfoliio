import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LiveTicker from "@/components/layout/LiveTicker";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hashim Mir | Solutions Architect & Forward Deployed Engineer",
  description:
    "Solutions Architect & Forward Deployed Engineer turning complex enterprise problems into resilient, production-grade AI and distributed systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth h-screen w-screen overflow-hidden" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-background text-foreground antialiased h-screen w-screen overflow-hidden flex flex-col`}
      >
        <ThemeProvider>
          <div className="flex-none z-50">
            <LiveTicker />
          </div>
          <main className="flex-1 relative overflow-hidden min-h-0">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
