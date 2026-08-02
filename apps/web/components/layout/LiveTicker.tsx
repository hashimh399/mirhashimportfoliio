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
        // Use your deployed API URL here, fallback to localhost for testing
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const res = await fetch(`${apiUrl}/api/ticker`);
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (error) {
        console.error("Ticker fetch error:", error);
      }
    };

    fetchTicker();
    const interval = setInterval(fetchTicker, 60000); // Poll every 60s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-neutral-950 border-b border-neutral-800 text-neutral-300 text-xs py-2 overflow-hidden flex items-center">
      <div className="flex whitespace-nowrap animate-marquee">
        {!data ? (
          <span className="animate-pulse">Loading market data...</span>
        ) : (
          <div className="flex space-x-12 px-4 font-mono tracking-wider">
            <span>🟢 BTC: ${data.crypto.BTC.toLocaleString()}</span>
            <span>🟣 ETH: ${data.crypto.ETH.toLocaleString()}</span>
            <span>🔵 SOL: ${data.crypto.SOL.toLocaleString()}</span>
            {/* Duplicate for seamless infinite scroll effect */}
            <span>🟢 BTC: ${data.crypto.BTC.toLocaleString()}</span>
            <span>🟣 ETH: ${data.crypto.ETH.toLocaleString()}</span>
            <span>🔵 SOL: ${data.crypto.SOL.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}