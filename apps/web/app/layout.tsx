import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hashim Mir | Solutions Architect & Forward Deployed Engineer",
  description:
    "Solutions Architect at Consilium Software. Engineer of Webex App Hub integrations — UniAgent, UAD, UniVCX, UniCampaign, SplunkBridge. On-prem GenAI, Kafka at 100k+ events/sec, and omnichannel CRM integrations for Cisco, Genesys, and WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth h-screen w-screen overflow-hidden"
      suppressHydrationWarning
    >
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
          <div className="flex-1 relative overflow-hidden min-h-0">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
