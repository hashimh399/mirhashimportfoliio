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
    "I design and ship enterprise contact-center and AI systems — from Webex integrations to on-prem GenAI.",
  subheadline:
    "Solutions Architect at Consilium Software. I engineer production integrations for Cisco Webex, Genesys, Splunk, WhatsApp, and major CRMs — most of the products listed on the Webex App Hub under Consilium.",
  stats: [
    "5+ years software engineering",
    "Solutions Architect at Consilium Software",
    "Engineered most Consilium products on Webex App Hub",
    "UniAgent · UAD · UniVCX · UniCampaign · SplunkBridge",
    "On-prem GenAI copilot for a regulated bank",
    "Kafka pipeline at 100k+ events/sec into Splunk",
    "Platforms scaled to 5,000+ concurrent agents",
  ],
  shortIntro:
    "I'm Hashim, based in Delhi. I own architecture and delivery for mission-critical CX platforms — pre-sales whiteboarding, RFP responses, spikes, production hardening, and the debugging that comes after launch. My rule: design for production from day one. Demos that can't survive real users aren't done.",
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
    id: "webex-apphub",
    title: "Consilium × Webex Contact Center Product Suite",
    summary:
      "Engineered most of Consilium's Webex App Hub integrations — CRM CTI, unified agent desktop, video CX, outbound campaigns, and Splunk observability.",
    challenge:
      "Enterprise contact centers on Cisco Webex Contact Center (WxCC) need deep CRM integration, omnichannel agent desktops, outbound campaign tooling, and real-time analytics — all certified, compliant, and shippable as SaaS on the Webex App Hub.",
    solution:
      "Led architecture and engineering across the Consilium product suite: UniAgent™ (CRM CTI for Webex Calling — screen pop, click-to-dial, AI call notes), Unified Agent Desktop (voice + digital in one surface), UniVCX™ (video, co-browse, e-signature), UniCampaign™ (AI-driven outbound across voice, SMS, email, WhatsApp), and SplunkBridge (WxCC → Splunk real-time ingestion). Built integrations with Salesforce, SAP C4C, Microsoft Dynamics, Genesys, and WhatsApp Business channels.",
    impact:
      "Products live on the Webex App Hub and Cisco Commerce Workspace (CONSILIUM-APPS). Used by enterprise contact centers globally. Platforms scaled to 5,000+ concurrent agents on blended voice, chat, and digital workloads.",
    tech: "Cisco Webex CC/Calling APIs, TypeScript, Node.js, C#, Kafka, Redis, PostgreSQL, AWS/GCP, Salesforce, SAP C4C, MS Dynamics, Genesys, WhatsApp Business API, Splunk HEC.",
    askPrompt:
      "Tell me about the Consilium Webex App Hub products you engineered — UniAgent, UAD, UniVCX, UniCampaign, and SplunkBridge.",
  },
  {
    id: "onprem-genai",
    title: "On-Premise GenAI Copilot for a Regulated Bank",
    summary:
      "Secure, on-prem GenAI copilot with RAG and agentic workflows — no customer data leaves the bank's environment.",
    challenge:
      "A regulated bank needed an internal GenAI copilot for knowledge work, document analysis, and agent assist. Public cloud LLMs were off-limits due to data residency, audit requirements, and compliance review.",
    solution:
      "Architected a fully on-prem GenAI platform: private LLM deployment, RAG pipeline with secure document ingestion and vector store, role-based access with full audit logging, and agentic workflows with automated tool-calling to execute backend operations without data leaving the environment.",
    impact:
      "Production copilot used by hundreds of bank employees. Passed internal security and compliance review. Cut time spent searching internal knowledge bases from minutes to seconds for common queries.",
    tech: "On-prem GPU infrastructure, private LLMs, vector databases (embeddings + retrieval), enterprise IAM, secure networking, Python, orchestration layer for agentic tool-calling.",
    askPrompt:
      "Tell me about the on-premise GenAI copilot for the regulated bank.",
  },
  {
    id: "splunkbridge",
    title: "SplunkBridge — 100k+ Events/sec WxCC → Splunk Pipeline",
    summary:
      "High-throughput Kafka pipeline ingesting, enriching, and routing Webex Contact Center events into Splunk for real-time ops dashboards.",
    challenge:
      "Webex Contact Center generates massive event volumes — agent status, interaction metrics, queue stats, customer journey data. Operations teams needed this in Splunk in near real time, without blocking WxCC or losing events under peak load.",
    solution:
      "Designed SplunkBridge: asynchronous ingestion via Webex APIs and webhooks, Kafka-based streaming with partitioning and back-pressure handling, data enrichment (agent details, team IDs, structured Splunk-compatible formats), and push to Splunk HTTP Event Collector (HEC) for dashboards and alerting.",
    impact:
      "Sustained 100k+ events/sec in production with near-zero ingestion latency. Real-time contact-center observability for ops teams. Graceful degradation under load spikes with clear alerting.",
    tech: "Apache Kafka, Webex Contact Center APIs, OAuth 2.0, Splunk HEC, Redis, partitioning & back-pressure, observability dashboards.",
    askPrompt:
      "How did SplunkBridge handle 100k+ events per second from Webex into Splunk?",
  },
  {
    id: "omnichannel-integrations",
    title: "Omnichannel CRM & Messaging Integrations",
    summary:
      "Deep CTI and reverse-CTI integrations bridging contact-center platforms into Salesforce, SAP C4C, Dynamics, Genesys, Cisco, and WhatsApp.",
    challenge:
      "Enterprise customers run blended contact centers — voice, chat, email, SMS, WhatsApp — each tied to a different CRM or legacy platform. Agents need one screen, one login, and context on every interaction without switching tools.",
    solution:
      "Built and maintained production integrations across the Consilium connector portfolio: embedded CTI widgets in CRMs, reverse-CTI for click-to-dial and screen pop, WhatsApp Business API routing into agent queues, and Genesys/Cisco telephony bridges. Owned capacity planning and horizontal scaling as deployments grew.",
    impact:
      "Integrations deployed across multiple enterprise customers. Single agent desktop for voice and digital channels. Reduced average handle time by eliminating context switching between CRM and contact-center tools.",
    tech: "Salesforce Open CTI, SAP C4C, MS Dynamics, Genesys Cloud APIs, Cisco Finesse/Webex, WhatsApp Business API, gRPC, WebSockets, microservices on AWS.",
    askPrompt:
      "Tell me about your CRM and messaging integrations with Cisco, Genesys, and WhatsApp.",
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
    id: "webex-suite",
    title: "Consilium Webex App Hub Integration Layer",
    caption:
      "CRM-embedded CTI, unified agent desktop, and WxCC event routing into Splunk — the integration spine behind UniAgent, UAD, and SplunkBridge.",
    mermaid: `flowchart LR
  Agent[Agent CRM Desktop] --> CTI[UniAgent CTI Layer]
  CTI --> WxCC[Webex Contact Center]
  WxCC --> Events[WxCC Event Stream]
  Events --> Bridge[SplunkBridge]
  Bridge --> Kafka[Kafka Pipeline]
  Kafka --> Splunk[(Splunk HEC)]
  WxCC --> UAD[Unified Agent Desktop]
  UAD --> Digital[Chat · Email · WhatsApp]`,
  },
  {
    id: "genai-arch",
    title: "On-Prem GenAI Copilot Architecture",
    caption:
      "Private LLM with RAG, agentic tool-calling, and audit logging — all data stays inside the regulated boundary.",
    mermaid: `flowchart LR
  User[Bank Employee] --> GW[API Gateway / Auth]
  GW --> Orch[Orchestrator]
  Orch --> RAG[RAG Pipeline]
  RAG --> VS[(Vector Store)]
  Orch --> LLM[Private LLM]
  Orch --> Tools[Agentic Tool-Calling]
  Tools --> Backend[Internal Systems]
  LLM --> Resp[Response with citations]
  Orch --> Audit[Audit Log]`,
  },
  {
    id: "splunkbridge-arch",
    title: "SplunkBridge Event Pipeline",
    caption:
      "Async WxCC ingestion → Kafka partitioning → enrichment → Splunk HEC. Built to sustain 100k+ events/sec.",
    mermaid: `flowchart LR
  WxCC[Webex CC APIs / Webhooks] --> Ing[Async Ingestion]
  Ing --> Kafka[Kafka — partitioned streams]
  Kafka --> Enrich[Enrichment Layer]
  Enrich --> HEC[Splunk HEC]
  Kafka --> Obs[Ops Dashboards & Alerting]`,
  },
  {
    id: "fde-flow",
    title: "How I Work — Discovery to Production",
    caption:
      "Typical engagement: understand the business problem, design the reference architecture, spike the risky parts, harden for production, then hand over.",
    mermaid: `flowchart LR
  D[Discovery & Whiteboarding] --> R[Reference Architecture]
  R --> S[Spike / POC]
  S --> P[Production Hardening]
  P --> H[Handover & Sustainment]`,
  },
];

export const workPrinciples = [
  "Design for production from day one — prototypes that can't survive real users are just demos.",
  "Own the outcome, not just the code — accountable from pre-sales whiteboarding to post-launch sustainment.",
  "Treat AI as an engineering discipline — testing, observability, and security, not magic.",
];

export const coreCapabilities = [
  "Webex Contact Center & Cisco telephony integrations",
  "CRM CTI / reverse-CTI (Salesforce, SAP C4C, MS Dynamics)",
  "GenAI & agentic workflows (on-prem, hybrid, RAG)",
  "High-throughput event pipelines (Kafka → Splunk)",
  "Omnichannel CX (voice, chat, email, SMS, WhatsApp)",
  "Cloud & hybrid infrastructure (AWS, GCP)",
];

export const consiliumProducts = [
  "UniAgent™ — CRM CTI for Webex Calling",
  "Unified Agent Desktop — omnichannel agent surface",
  "UniVCX™ — video, co-browse, e-signature",
  "UniCampaign™ — AI outbound campaigns",
  "SplunkBridge — WxCC → Splunk real-time pipeline",
];

export const enterpriseLogos = [
  { name: "Cisco Webex", key: "webex" },
  { name: "Cisco", key: "cisco" },
  { name: "Genesys", key: "genesys" },
  { name: "Splunk", key: "splunk" },
  { name: "WhatsApp", key: "whatsapp" },
  { name: "Salesforce", key: "salesforce" },
  { name: "SAP C4C", key: "sap" },
  { name: "Microsoft Dynamics", key: "dynamics" },
] as const;

export const about = {
  line1:
    "I'm Hashim — Solutions Architect at Consilium Software, based in Delhi.",
  line2:
    "For the last 3+ years I've led architecture and engineering for Consilium's Webex Contact Center product suite — most of what's listed on the Webex App Hub. Before that, I built enterprise software foundations at Cognizant. Across both roles, I've owned the full lifecycle: RFPs, reference architectures, spikes, production delivery, and sustainment.",
  line3:
    "I work best where business requirements meet hard technical constraints — regulated on-prem AI, contact-center integrations at scale, or a Kafka pipeline that can't drop events at peak load. I move between whiteboard sessions and production debugging without treating them as different jobs.",
};

export const contact = {
  headline: "Have a hard integration or architecture problem? Let's talk.",
};

export const chatSuggestions = [
  "What Consilium products did you build for Webex?",
  "How does SplunkBridge handle 100k events/sec?",
  "Tell me about the on-prem GenAI bank copilot",
];
