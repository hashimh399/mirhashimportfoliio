'use client';

import { useState, useRef } from 'react';
import { Database, BrainCircuit, Code2, Layers, ShieldCheck, Cpu } from 'lucide-react';
import VariableProximity from '../ui/VariableProximity';
import SpecularButton from '../ui/SpecularButton';

const ROLE_DATA = [
  {
    id: 'fde',
    title: 'Forward Deployed / AI Engineer',
    icon: <BrainCircuit className="w-5 h-5 text-cyan-400" />,
    description: 'Engineering production-grade LLM applications, agentic loops, and reliable AI system workflows.',
    coreSkills: [
      'Python (Async, Type Hints, Packaging)',
      'Agentic Orchestration (ReAct, State Machines)',
      'RAG & Hybrid Search (BM25 + Vector DBs)',
      'Guardrails & Execution Security',
      'LLM Observability & OpenTelemetry',
      'Evaluation Frameworks & LLM-as-a-Judge'
    ],
    useCase: {
      title: 'Enterprise Agentic RAG & Guardrails',
      detail: 'Architected robust production pipelines with asynchronous Python, advanced vector store indexing, strict input/output filtering, and trajectory-level evaluation frameworks ensuring zero-hallucination thresholds.'
    }
  },
  {
    id: 'architect',
    title: 'Solutions Architect (Enterprise)',
    icon: <Database className="w-5 h-5 text-purple-400" />,
    description: 'Designing high-availability enterprise infrastructure, deep telephony integrations, and disaster recovery.',
    coreSkills: [
      'HA Architecture & Disaster Management',
      'Cisco UCCE & WXCC (Cloud/On-Prem)',
      'Genesys Copilot Integration & MCP Servers',
      'CRM & SAP (On-Prem & Cloud) Ecosystems',
      'Kafka Event-Driven Pipelines (101k+ ev/min)',
      'Enterprise Security & Compliance Guardrails'
    ],
    useCase: {
      title: 'Enterprise Contact Center & SAP Integration',
      detail: 'At Consilium, architected fault-tolerant disaster recovery and high-availability systems integrating Cisco UCCE/WXCC and Genesys platforms with enterprise SAP and CRM environments, scaling Kafka pipelines smoothly past 100k events/min.'
    }
  },
  {
    id: 'software',
    title: 'Sr. Software Engineer (Web2 & Web3)',
    icon: <Code2 className="w-5 h-5 text-indigo-400" />,
    description: 'Building scalable full-stack web applications, secure payment infrastructure, and on-chain systems.',
    coreSkills: [
      'Next.js / React / TypeScript',
      'Node.js / Go / C# Backend Services',
      'Web3 Wallet Connectivity & Signatures',
      'DeFi Primitives, DEXs & Swaps',
      'Solana Anchor / SVM / Solidity Smart Contracts',
      'Zero-Knowledge Proofs (Circom)'
    ],
    useCase: {
      title: 'Decentralized Payment Orchestration',
      detail: 'Engineered production-grade Web3 transaction lifecycles, wallet connectivity frameworks, and secure on-chain/off-chain settlement flows balancing high frontend performance with strict distributed system observability.'
    }
  }
];

export default function SkillsSection() {
  const [activeRole, setActiveRole] = useState(0);
  const containerRef = useRef(null);

  const currentRole = ROLE_DATA[activeRole]!;

  return (
    <div ref={containerRef} className="relative w-full flex flex-col gap-8 pb-12">
      
      {/* Animated Header */}
      <div className="mb-2">
        <VariableProximity
          label="Multi-Disciplinary Engineering."
          className="text-4xl md:text-6xl font-bold tracking-tight text-white cursor-default"
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 900, 'opsz' 40"
          containerRef={containerRef}
          radius={120}
          falloff="gaussian"
        />
        <p className="text-neutral-400 mt-4 max-w-2xl text-lg leading-relaxed">
          Filter through technical proficiencies spanning advanced AI agents, enterprise contact center architectures, and resilient Web2/Web3 software systems.
        </p>
      </div>

      {/* The Specular Button Toggle Row */}
      <div className="flex flex-wrap gap-4 mb-8">
        {ROLE_DATA.map((role, index) => {
          const isActive = activeRole === index;
          return (
            <div key={role.id} className="relative">
              <SpecularButton
                size="md"
                radius={30}
                tint={isActive ? "#A855F7" : "#ffffff"}
                tintOpacity={isActive ? 0.1 : 0.03}
                blur={12}
                textColor={isActive ? "#ffffff" : "#a1a1aa"}
                lineColor={isActive ? "#A855F7" : "#ffffff"}
                baseColor="#27272a"
                intensity={isActive ? 1.5 : 0.8}
                thickness={isActive ? 2 : 1}
                speed={0.4}
                autoAnimate={isActive} 
                onClick={() => setActiveRole(index)}
                className="font-medium tracking-wide flex gap-2 items-center"
              >
                {role.icon}
                {role.title}
              </SpecularButton>
            </div>
          );
        })}
      </div>

      {/* The Glassmorphic Content Card for the Selected Role */}
      <div className="relative flex flex-col p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 min-h-[320px]">
        
        {/* Role Header */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white shadow-inner">
            {currentRole.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{currentRole.title}</h3>
            <p className="text-sm text-neutral-400 mt-1">{currentRole.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column: Core Skills Grid */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-4 flex items-center gap-2">
              <Layers className="w-3 h-3 text-purple-400" /> Core Stack & Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentRole.coreSkills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs font-medium text-neutral-300 hover:text-white hover:border-white/20 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Highlighted Use Case */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-3 h-3 text-cyan-400" /> Real-World Execution
            </h4>
            <div className="p-5 bg-black/30 rounded-2xl border border-white/5 shadow-inner">
              <h5 className="text-sm font-semibold text-white mb-2">{currentRole.useCase.title}</h5>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {currentRole.useCase.detail}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}