/** Swap placeholders via env or replace these strings before shipping. */
export const siteConfig = {
  name: "Hashim Mir",
  fullName: "Hashim",
  title: "Solutions Architect & Forward Deployed Engineer",
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL || "[Insert Calendly Link Here]",
  linkedinUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL || "[Insert LinkedIn URL]",
  email: process.env.NEXT_PUBLIC_EMAIL || "Hashimh399@gmail.com",
};

export function linkHref(url: string): string {
  if (!url || url.startsWith("[")) return "#";
  return url;
}

export function isPlaceholderLink(url: string): boolean {
  return !url || url.startsWith("[");
}

export const hero = {
  headline:
    "Architecting AI-Native Systems at Enterprise Scale. From Whiteboard to Production",
  subheadline:
    "Solutions Architect & Forward Deployed Engineer. I turn complex enterprise problems into resilient, production-grade AI and distributed systems that actually ship and stay up.",
  stats: [
    "5+ years software engineering",
    "3+ years Solutions Architect",
    "On-prem GenAI copilots for regulated banks",
    "Event pipelines at 100k+ events/sec",
    "Communications platforms scaled to 5,000+ concurrent enterprise users",
  ],
  shortIntro:
    "I'm Hashim. I bridge enterprise ambition and production reality. Whether whiteboarding architecture with stakeholders or debugging distributed systems at 2 a.m., I care about technology that works — reliably, securely, and at scale.",
};

export type CaseStudy = {
  id: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: string;
  tech: string;
  askPrompt: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "onprem-genai",
    title: "On-Premise GenAI Copilot for a Regulated Bank",
    summary:
      "Production-grade on-prem GenAI copilot used by hundreds of employees under full regulatory compliance.",
    challenge:
      "A major regulated bank needed an internal GenAI copilot for knowledge work and document analysis. Public cloud LLMs were off-limits due to data residency and compliance requirements.",
    solution:
      "Designed and led the architecture of a fully on-premise GenAI platform: Private LLM deployment + retrieval-augmented generation (RAG) pipeline; Secure document ingestion and vector store; Role-based access and full audit logging; Integration with existing enterprise systems.",
    impact:
      "Delivered production-grade copilot used by hundreds of employees. Maintained full regulatory compliance. Significantly reduced time spent searching internal knowledge bases.",
    tech: "On-prem infrastructure, private LLMs, vector databases, enterprise identity systems, secure networking.",
    askPrompt:
      "Tell me about the on-premise GenAI Copilot for a regulated bank.",
  },
  {
    id: "event-pipeline",
    title: "High-Throughput Event-Driven Pipeline",
    summary:
      "Sustained 100k+ events/sec in production with high availability and clear operational observability.",
    challenge:
      "Need to process and react to 100,000+ events per second with low latency and high reliability for a mission-critical enterprise system.",
    solution:
      "Architected an event-driven pipeline using modern streaming and messaging patterns, with careful attention to partitioning, back-pressure handling, exactly-once semantics where required, and observability.",
    impact:
      "Sustained 100k+ events/sec in production. High availability and graceful degradation under load. Clear operational dashboards and alerting.",
    tech: "Streaming / messaging, partitioning, back-pressure, observability.",
    askPrompt:
      "Tell me about the high-throughput event-driven pipeline at 100k+ events/sec.",
  },
  {
    id: "comms-scale",
    title: "Enterprise Communications Platform Scale-Up",
    summary:
      "Scaled a communications platform to 5,000+ concurrent enterprise users with production-grade stability.",
    challenge:
      "Scale a communications platform to support 5,000+ concurrent enterprise users while maintaining performance and reliability.",
    solution:
      "End-to-end ownership of architecture and delivery: capacity planning, horizontal scaling strategy, stateful service design, and production hardening.",
    impact:
      "Successfully scaled to 5,000+ concurrent users with production-grade stability.",
    tech: "Capacity planning, horizontal scaling, stateful services, production hardening.",
    askPrompt:
      "Describe how you scaled the enterprise communications platform to 5,000+ concurrent users.",
  },
];

export type ArchitectureDiagram = {
  id: string;
  title: string;
  caption: string;
  mermaid: string;
};

export const architectureDiagrams: ArchitectureDiagram[] = [
  {
    id: "genai-arch",
    title: "On-Prem GenAI Copilot Architecture",
    caption:
      "Private LLM path with RAG, citations, and audit logging — no data leaves the regulated boundary.",
    mermaid: `flowchart LR
  User[User] --> GW[API Gateway / Auth]
  GW --> Orch[Orchestrator]
  Orch --> RAG[RAG Pipeline]
  RAG --> Ing[Ingestion]
  Ing --> Chunk[Chunking]
  Chunk --> Emb[Embedding]
  Emb --> VS[(Vector Store)]
  Orch --> LLM[Private LLM]
  VS --> Orch
  LLM --> Resp[Response with citations]
  Orch --> Audit[Audit Log]`,
  },
  {
    id: "event-arch",
    title: "High-Throughput Event Pipeline",
    caption:
      "Partitioned streaming with back-pressure and a dedicated observability plane for production ops.",
    mermaid: `flowchart LR
  Prod[Producers] --> Bus[Message Bus / Streaming Layer]
  Bus --> Cons[Processing Consumers]
  Cons --> Sink[Sink / Downstream]
  Cons --> Obs[Observability plane]
  Bus --> Obs`,
  },
  {
    id: "comms-arch",
    title: "Enterprise Communications Platform",
    caption:
      "Edge load balancing into stateless services plus a stateful session layer over the real-time core.",
    mermaid: `flowchart LR
  Clients[Clients] --> LB[Load Balancer / Edge]
  LB --> Stateless[Stateless services]
  LB --> Session[Stateful session layer]
  Stateless --> Core[Real-time media / messaging core]
  Session --> Core
  Core --> Persist[Persistence and Analytics]`,
  },
  {
    id: "fde-flow",
    title: "Typical Forward-Deployed Engagement Flow",
    caption:
      "Whiteboard to production: discovery, reference architecture, spike, harden, then handover.",
    mermaid: `flowchart LR
  D[Discovery and Whiteboarding] --> R[Reference Architecture]
  R --> S[Spike / POC]
  S --> P[Production Hardening]
  P --> H[Handover and Knowledge Transfer]`,
  },
];

export const coreCapabilities = [
  "AI-Native & GenAI Architecture (on-prem & hybrid)",
  "Event-driven and high-throughput distributed systems",
  "Enterprise integration (Salesforce, SAP C4C, MS Dynamics, Genesys, Cisco, etc.)",
  "Cloud & hybrid infrastructure (AWS primary)",
  "Observability & production operations (Splunk and similar)",
  "Forward-deployed engineering: from whiteboard to production ownership",
];

export const enterpriseLogos = [
  { name: "AWS", key: "aws" },
  { name: "Splunk", key: "splunk" },
  { name: "Salesforce", key: "salesforce" },
  { name: "SAP C4C", key: "sap" },
  { name: "Microsoft Dynamics", key: "dynamics" },
  { name: "Genesys", key: "genesys" },
  { name: "Cisco", key: "cisco" },
] as const;

export const about = {
  line1: "I'm Hashim — Solutions Architect and Forward Deployed Engineer.",
  line2:
    "Over the last 5+ years I've owned the full lifecycle of mission-critical platforms. The last 3+ years have been focused on architecture and delivery of AI and distributed systems in complex enterprise environments.",
  line3:
    "I move fluidly between stakeholder whiteboarding sessions and deep production debugging. My north star is simple: build technology that works — reliably, securely, and at scale.",
};

export const contact = {
  headline: "Let's build something that actually ships.",
};

export const chatSuggestions = [
  "Tell me about the on-prem GenAI copilot",
  "How did you hit 100k+ events/sec?",
  "What's your forward-deployed approach?",
];
