import { useRef } from 'react';
import { Database, BrainCircuit, Code2 } from 'lucide-react';
import VariableProximity from '../ui/VariableProximity';
import SpecularButton from '../ui/SpecularButton';

export default function ExploreSection() {
  const containerRef = useRef(null);

  const skills = [
    {
      title: "Solutions Architecture",
      icon: <Database className="w-6 h-6 text-cyan-400" />,
      description: "Designing resilient, high-throughput distributed systems.",
      useCase: "Architected 101k-events/min Kafka data pipelines and zero-downtime deployment strategies for enterprise systems at Consilium and Cognizant."
    },
    {
      title: "AI Engineering",
      icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
      description: "Bridging LLMs with deterministic backend infrastructure.",
      useCase: "Engineered AI Copilots and an off-chain AI loan-advisory layer for Neuroledgers, processing complex contextual data with sub-second latency."
    },
    {
      title: "Software Engineering",
      icon: <Code2 className="w-6 h-6 text-indigo-400" />,
      description: "Building scalable frontends, APIs, and Web3 infrastructure.",
      useCase: "Developed highly performant Next.js applications, custom WebGL integrations, and Circom-based zero-knowledge proofs optimized for low gas."
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full flex flex-col gap-8 pb-12">
      
      {/* Animated Header */}
      <div className="mb-4">
        <VariableProximity
          label="Capabilities & Architecture."
          className="text-4xl md:text-5xl font-bold tracking-tight text-white cursor-default"
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 900, 'opsz' 40"
          containerRef={containerRef}
          radius={150}
          falloff="gaussian"
        />
        <p className="text-neutral-400 mt-4 max-w-2xl text-lg leading-relaxed">
          A technical breakdown of competencies spanning distributed systems, artificial intelligence, and full-stack engineering.
        </p>
      </div>

      {/* Glassmorphic Skill Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {skills.map((skill, i) => (
          <div 
            key={i} 
            className="group relative flex flex-col p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-500 shadow-2xl"
          >
            {/* Top Icon */}
            <div className="p-3 bg-black/40 rounded-2xl w-fit border border-white/10 mb-6 shadow-inner">
              {skill.icon}
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-3">
              {skill.title}
            </h3>
            
            <p className="text-sm text-neutral-400 mb-6 flex-1 leading-relaxed">
              {skill.description}
            </p>
            
            {/* Highlighted Use Case Box */}
            <div className="p-4 bg-black/30 rounded-2xl border border-white/5 mb-8">
              <span className="block text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-2">
                Primary Use Case
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {skill.useCase}
              </p>
            </div>

            {/* Specular Button at the bottom */}
            <div className="mt-auto">
              <SpecularButton
                size="md"
                radius={16}
                tint="#ffffff"
                tintOpacity={0.03}
                blur={12}
                textColor="#ffffff"
                lineColor="#A855F7" // Purple shine to match the sidebar accent
                baseColor="#27272a"
                intensity={1.2}
                thickness={2}
                speed={0.4}
                autoAnimate={false}
                className="w-full font-medium tracking-wide"
              >
                View Architecture
              </SpecularButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}