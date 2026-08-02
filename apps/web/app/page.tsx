// "use client";

// import { useState } from "react";
// import { Mic } from "lucide-react";
// import LineSidebar from "@/components/ui/LineSidebar";
// import Prism from "@/components/ui/Prism";
// import AiPersona from "@/components/AiPersona";
// import ExploreSection from "@/components/sections/ExploreSection";
// import SkillsSection from "@/components/sections/SkillsSection";


// const SECTIONS = ["Introduction", "Explore", "Experience", "Projects" , "Skills"];

// export default function Home() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAiBubbleOpen, setIsAiBubbleOpen] = useState(false);

//   return (
//     <div className="relative flex flex-col md:flex-row h-full w-full bg-black">
      
//       {/* 1. THE BACKGROUND */}
//       <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
//         <Prism
//           animationType="rotate"
//           timeScale={0.3} 
//           height={3.5}
//           baseWidth={5.5}
//           scale={3.6}
//           hueShift={0}
//           colorFrequency={1}
//           noise={0.5}
//           glow={1}
//         />
//       </div>

//       {/* 2. RESPONSIVE NAVIGATION & SIDEBAR */}
//       <aside className="relative z-10 w-full md:w-80 h-auto md:h-full border-b md:border-b-0 md:border-r border-white/10 bg-black/40 backdrop-blur-md pt-4 md:pt-12 px-6 md:px-8 flex-none flex flex-col">
        
//         {/* Header */}
//         <div className="mb-4 md:mb-12 flex justify-between items-end md:block">
//           <div>
//             <h1 className="font-bold text-2xl md:text-3xl text-white tracking-tighter">
//               Hashim Mir<span className="text-purple-500">.</span>
//             </h1>
//             <p className="text-[10px] md:text-xs text-neutral-500 mt-1 md:mt-2 tracking-widest uppercase font-semibold">
//               Solutions Architect | Software Engineer
//             </p>
//           </div>
//         </div>
        
//         {/* DESKTOP NAV: The React Bits Line Sidebar */}
//         <div className="hidden md:flex flex-col flex-1 h-full">
//           <LineSidebar
//             items={SECTIONS}
//             accentColor="#A855F7"
//             textColor="#888888"
//             markerColor="#444444"
//             defaultActive={0}
//             onItemClick={(index: number) => setActiveIndex(index)}
//           />
          
//           {/* DESKTOP AI PERSONA (Pushed to bottom using mt-auto) */}
//           <div className="mt-auto pb-8">
//             <AiPersona />
//           </div>
//         </div>

//         {/* MOBILE NAV: Horizontal Scrollable Menu */}
//         <div className="md:hidden flex space-x-6 pb-2 overflow-x-auto w-full snap-x [&::-webkit-scrollbar]:hidden">
//           {SECTIONS.map((sec, i) => (
//             <button 
//               key={sec} 
//               onClick={() => setActiveIndex(i)}
//               className={`snap-start text-sm whitespace-nowrap font-medium transition-colors ${
//                 activeIndex === i ? 'text-purple-500' : 'text-neutral-500 hover:text-white'
//               }`}
//             >
//               {sec}
//             </button>
//           ))}
//         </div>
//       </aside>

//       {/* 3. THE CONTENT AREA */}
//       <main className="relative z-10 flex-1 h-full p-6 md:p-16 overflow-y-auto">
//         <div className="max-w-4xl h-full flex flex-col justify-start md:justify-center pt-8 md:pt-0">
//           <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
//             Section: {SECTIONS[activeIndex]}
//           </h2>
//           <p className="text-lg md:text-xl text-neutral-400">
//             Content placeholder for {SECTIONS[activeIndex]}.
//           </p>
//         </div>
//       </main>

//       {/* 4. MOBILE AI BUBBLE / FLOATING ACTION BUTTON */}
//       <div className="md:hidden fixed bottom-6 right-6 z-50">
//         {isAiBubbleOpen ? (
//           <div className="animate-fade-in w-[90vw] max-w-[320px] mb-2 origin-bottom-right drop-shadow-2xl">
//             <AiPersona onClose={() => setIsAiBubbleOpen(false)} />
//           </div>
//         ) : (
//           <button
//             onClick={() => setIsAiBubbleOpen(true)}
//             className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-white/20 transition-transform hover:scale-105 active:scale-95"
//           >
//             <Mic className="w-6 h-6 text-white" />
//           </button>
//         )}
//       </div>

//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Mic } from "lucide-react";
import LineSidebar from "@/components/ui/LineSidebar";
import Prism from "@/components/ui/Prism";
import AiPersona from "@/components/AiPersona";
import ExploreSection from "@/components/sections/ExploreSection";
import SkillsSection from "@/components/sections/SkillsSection";

const SECTIONS = ["Introduction", "Explore", "Experience", "Projects", "Skills"];

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
        <div className="max-w-5xl mx-auto h-full flex flex-col justify-start md:justify-center pt-8 md:pt-0">
          
          {/* 0. INTRODUCTION */}
          {activeIndex === 0 && (
            <div className="flex flex-col justify-center min-h-[70vh] animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
                Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Intelligence.</span>
              </h2>
              <p className="max-w-2xl text-lg text-neutral-400 leading-relaxed mb-10">
                Solution Architect, AI Engineer, and Software Engineer. Building high-performance data pipelines, integrating LLM orchestration layers, and designing zero-knowledge web3 infrastructure.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveIndex(4)} // Jumps to Skills tab
                  className="px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  View Technical Stack
                </button>
              </div>
            </div>
          )}

          {/* 1. EXPLORE (Deep Dives & Capabilities) */}
          {activeIndex === 1 && (
            <div className="min-h-[70vh] animate-fade-in pt-8 md:pt-0">
              <ExploreSection />
            </div>
          )}

          {/* 2. EXPERIENCE (Timeline Placeholder) */}
          {activeIndex === 2 && (
            <div className="min-h-[70vh] flex flex-col justify-center animate-fade-in">
              <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Experience Journey.</h2>
              <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 text-neutral-400 shadow-2xl flex items-center justify-center min-h-[300px]">
                Interactive timeline component will render here...
              </div>
            </div>
          )}

          {/* 3. PROJECTS (Grid Placeholder) */}
          {activeIndex === 3 && (
            <div className="min-h-[70vh] flex flex-col justify-center animate-fade-in">
              <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Featured Projects.</h2>
              <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 text-neutral-400 shadow-2xl flex items-center justify-center min-h-[300px]">
                Project grid component will render here...
              </div>
            </div>
          )}

          {/* 4. SKILLS (Role-Based Toggle) */}
          {activeIndex === 4 && (
            <div className="min-h-[70vh] animate-fade-in pt-8 md:pt-0">
              <SkillsSection />
            </div>
          )}

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