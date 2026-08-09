"use client";

import { useEffect, useState } from "react";

interface TickerData {
  crypto: {
    BTC: number;
    ETH: number;
    SOL: number;
  };
}

export default function LiveTicker() {
  const [data, setData] = useState<TickerData | null>(null);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        const res = await fetch(`${apiUrl}/api/ticker`);
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (error) {
        console.error("Ticker fetch error:", error);
      }
    };

    fetchTicker();
    const interval = setInterval(fetchTicker, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full text-xs py-2 overflow-hidden flex items-center border-b"
      style={{
        background: "var(--ticker-bg)",
        color: "var(--ticker-fg)",
        borderColor: "var(--ticker-border)",
      }}
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {!data ? (
          <span className="animate-pulse px-4">Loading market data...</span>
        ) : (
          <div className="flex space-x-12 px-4 font-mono tracking-wider">
            <span>BTC: ${data.crypto.BTC.toLocaleString()}</span>
            <span>ETH: ${data.crypto.ETH.toLocaleString()}</span>
            <span>SOL: ${data.crypto.SOL.toLocaleString()}</span>
            <span>BTC: ${data.crypto.BTC.toLocaleString()}</span>
            <span>ETH: ${data.crypto.ETH.toLocaleString()}</span>
            <span>SOL: ${data.crypto.SOL.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
