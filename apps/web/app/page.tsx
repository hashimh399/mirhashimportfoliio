"use client";

import { useState } from "react";
import { Mic } from "lucide-react";
import LineSidebar from "@/components/ui/LineSidebar";
import Prism from "@/components/ui/Prism";
import AiPersona from "@/components/AiPersona";

const SECTIONS = ["Introduction", "Journey", "Experience", "Projects" , "Posts"];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAiBubbleOpen, setIsAiBubbleOpen] = useState(false);

  return (
    <div className="relative flex flex-col md:flex-row h-full w-full bg-black">
      
      {/* 1. THE BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <Prism
          animationType="rotate"
          timeScale={0.3} 
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.5}
          glow={1}
        />
      </div>

      {/* 2. RESPONSIVE NAVIGATION & SIDEBAR */}
      <aside className="relative z-10 w-full md:w-80 h-auto md:h-full border-b md:border-b-0 md:border-r border-white/10 bg-black/40 backdrop-blur-md pt-4 md:pt-12 px-6 md:px-8 flex-none flex flex-col">
        
        {/* Header */}
        <div className="mb-4 md:mb-12 flex justify-between items-end md:block">
          <div>
            <h1 className="font-bold text-2xl md:text-3xl text-white tracking-tighter">
              Hashim Mir<span className="text-purple-500">.</span>
            </h1>
            <p className="text-[10px] md:text-xs text-neutral-500 mt-1 md:mt-2 tracking-widest uppercase font-semibold">
              Solutions Architect | Software Engineer
            </p>
          </div>
        </div>
        
        {/* DESKTOP NAV: The React Bits Line Sidebar */}
        <div className="hidden md:flex flex-col flex-1 h-full">
          <LineSidebar
            items={SECTIONS}
            accentColor="#A855F7"
            textColor="#888888"
            markerColor="#444444"
            defaultActive={0}
            onItemClick={(index: number) => setActiveIndex(index)}
          />
          
          {/* DESKTOP AI PERSONA (Pushed to bottom using mt-auto) */}
          <div className="mt-auto pb-8">
            <AiPersona />
          </div>
        </div>

        {/* MOBILE NAV: Horizontal Scrollable Menu */}
        <div className="md:hidden flex space-x-6 pb-2 overflow-x-auto w-full snap-x [&::-webkit-scrollbar]:hidden">
          {SECTIONS.map((sec, i) => (
            <button 
              key={sec} 
              onClick={() => setActiveIndex(i)}
              className={`snap-start text-sm whitespace-nowrap font-medium transition-colors ${
                activeIndex === i ? 'text-purple-500' : 'text-neutral-500 hover:text-white'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </aside>

      {/* 3. THE CONTENT AREA */}
      <main className="relative z-10 flex-1 h-full p-6 md:p-16 overflow-y-auto">
        <div className="max-w-4xl h-full flex flex-col justify-start md:justify-center pt-8 md:pt-0">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Section: {SECTIONS[activeIndex]}
          </h2>
          <p className="text-lg md:text-xl text-neutral-400">
            Content placeholder for {SECTIONS[activeIndex]}.
          </p>
        </div>
      </main>

      {/* 4. MOBILE AI BUBBLE / FLOATING ACTION BUTTON */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        {isAiBubbleOpen ? (
          <div className="animate-fade-in w-[90vw] max-w-[320px] mb-2 origin-bottom-right drop-shadow-2xl">
            <AiPersona onClose={() => setIsAiBubbleOpen(false)} />
          </div>
        ) : (
          <button
            onClick={() => setIsAiBubbleOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-white/20 transition-transform hover:scale-105 active:scale-95"
          >
            <Mic className="w-6 h-6 text-white" />
          </button>
        )}
      </div>

    </div>
  );
}