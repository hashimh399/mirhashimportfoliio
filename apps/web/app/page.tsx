'use client';

import Ferrofluid from '../components/Ferrofluid';
import OptionWheel from '../components/OptionWheel';
import AiPersona from '../components/AiPersona';

export default function Page() {
  const menuItems = [
    'Overview',
    'AI Persona',
    'Architecture',
    'Kafka Pipeline',
    'Web3 & ZK',
    'Enterprise Scale'
  ];

  return (
    <main style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#03010A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Background Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Ferrofluid
          colors={["#4F46E5", "#06B6D4", "#E0F2FE"]}
          speed={0.3}
          scale={1.5}
          turbulence={0.6}
          fluidity={0.2}
          rimWidth={0.12}
          sharpness={3}
          shimmer={0.5}
          glow={1.5}
          flowDirection="down"
          mouseInteraction={true}
          mouseStrength={0.8}
          mouseRadius={0.3}
        />
      </div>

      {/* Sidebar Navigation */}
      <aside style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', height: '400px', width: '256px', zIndex: 20, display: 'flex', alignItems: 'center', pointerEvents: 'auto' }}>
        <OptionWheel
          items={menuItems}
          defaultSelected={1}
          textColor="#71717a"
          activeColor="#06b6d4"
          side="left"
          fontSize={1.1}
          spacing={2.2}
          curve={0.7}
          tilt={10}
          blur={1.2}
          fade={0.3}
          inset={20}
          draggable={true}
          onChange={(index, item) => console.log('Selected menu:', item)}
        />
      </aside>

      {/* Center Content Container */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '540px', padding: '0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(6, 182, 212, 0.1)', color: '#22d3ee', border: '1px solid rgba(6, 182, 212, 0.2)', fontSize: '12px', marginBottom: '8px', letterSpacing: '0.05em', backdropFilter: 'blur(12px)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22d3ee' }} />
            Forward Deployed AI Agent
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '-0.025em', color: '#ffffff', margin: 0 }}>
            Executive Voice Assistant
          </h1>
        </div>

        <AiPersona />
      </div>

    </main>
  );
}