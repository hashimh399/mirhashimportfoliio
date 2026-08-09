export const siteConfig = {
  name: "Hashim Mir",
  fullName: "Hashim",
  title: "Solutions Architect & Forward Deployed Engineer",
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com",
  linkedinUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/",
  email: process.env.NEXT_PUBLIC_EMAIL || "hello@example.com",
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com",
};

export const hero = {
  headline:
    "Architecting AI-Native Systems at Enterprise Scale — From Whiteboard to Production",
  subheadline:
    "Solutions Architect & Forward Deployed Engineer turning complex enterprise problems into resilient, production-grade AI and distributed systems.",
  bio: "I'm Hashim — a Solutions Architect and Forward Deployed Engineer who bridges the gap between enterprise ambition and production reality. Over 5+ years in software engineering, the last 3+ as a Solutions Architect, I've owned the full lifecycle of mission-critical platforms: architecting on-premise GenAI copilots for regulated banks, engineering event-driven pipelines that process 100,000+ events per second, and scaling communications platforms to 5,000+ concurrent enterprise users. Whether I'm whiteboarding architecture with stakeholders or debugging a distributed system in production, I care about building technology that works — reliably, securely, and at scale.",
};

export const explore = {
  intro:
    "I believe the best architecture is invisible — it's the systems that just work, even at 100,000 events per second, even under regulatory scrutiny, even when requirements change mid-sprint. My approach comes down to three principles:",
  principles: [
    {
      title: "Design for production from day one",
      body: "A prototype that can't survive contact with real users isn't a solution — it's a demo.",
    },
    {
      title: "Own the outcome, not just the code",
      body: "From pre-sales whiteboarding to post-launch sustainment, I stay accountable to the business problem, not just the ticket.",
    },
    {
      title: "Treat AI as an engineering discipline, not magic",
      body: "Agentic workflows and LLM pipelines deserve the same rigor — testing, observability, security — as any other production system.",
    },
  ],
  outro:
    "I'm drawn to problems at the intersection of scale, regulation, and ambiguity — the kind of enterprise challenges where \"best practice\" doesn't exist yet, and someone has to design it.",
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  body: string;
};

export const experience: ExperienceItem[] = [
  {
    company: "Consilium Software",
    role: "Solutions Architect / Lead Software Engineer",
    period: "2023–Present",
    body: "At Consilium Software, I found my niche at the intersection of enterprise architecture and applied AI. What began as designing omnichannel communications infrastructure — bridging CTI systems into enterprise CRMs like Salesforce and SAP C4C to serve 5,000+ concurrent agents — evolved into something more ambitious: architecting a secure, on-premise Generative AI Copilot for one of the most highly regulated environments imaginable, a bank's live contact center. Along the way, I built the connective tissue that makes real-time intelligence possible, including a Kafka-based event pipeline processing over 100,000 events per second and real-time analytics that surface live sentiment and performance data to the people who need it. I split my time between deep technical execution and being the primary architect in the room for pre-sales conversations, RFPs, and roadmap decisions — a dual role that taught me how to translate boardroom priorities into production code, and production realities back into strategy.",
  },
  {
    company: "Cognizant",
    role: "Software Engineer",
    period: "2021–2023",
    body: "My career began at Cognizant, where I built the foundations of enterprise software engineering within a large-scale consulting environment — the discipline, collaboration habits, and delivery rigor that still shape how I build today.",
  },
];

export type ProjectItem = {
  id: string;
  title: string;
  problem: string;
  solution: string;
  impact: string;
  askPrompt: string;
  note?: string;
};

export const projects: ProjectItem[] = [
  {
    id: "genai-copilot",
    title: "Enterprise GenAI Copilot for Regulated Banking",
    problem:
      "A highly regulated banking client needed to modernize its Genesys-based contact center with AI — but sensitive data couldn't leave a controlled environment, and the solution had to support live agents, supervisors, and self-service customers without compromising security or compliance.",
    solution:
      "Architected and deployed a secure, on-premise GenAI Copilot suite featuring a Retrieval-Augmented Generation (RAG) pipeline for real-time agent assist, live supervisory dashboards, and an agentic workflow engine with automated tool-calling that could securely execute protected backend operations — all without data leaving the regulated environment.",
    impact:
      "Delivered a production-grade agentic AI system inside one of the most compliance-sensitive environments in enterprise software — proof that AI-native workflows can operate safely at the level of rigor regulated industries demand.",
    askPrompt: "Tell me about the enterprise GenAI Copilot for regulated banking.",
  },
  {
    id: "splunkbridge",
    title: "SplunkBridge — High-Throughput Event Streaming Pipeline",
    problem:
      "Enterprise-grade observability was bottlenecked by disparate, high-volume data sources that couldn't be ingested, correlated, or routed fast enough for real-time monitoring.",
    solution:
      "Architected SplunkBridge, an Apache Kafka-based event-streaming pipeline that ingests, processes, and routes data from multiple disparate sources into a unified observability layer.",
    impact:
      "Enabled enterprise-grade observability at a sustained throughput of 100,000+ events per second — turning fragmented data into a real-time, unified operational picture.",
    askPrompt: "Tell me about SplunkBridge and the throughput you achieved.",
  },
  {
    id: "omnichannel",
    title: "Omnichannel Communications Platform",
    problem:
      "A large enterprise contact center operation needed a unified platform to blend voice and chat across multiple CRMs, without sacrificing latency or reliability as agent headcount scaled.",
    solution:
      "Engineered a scalable microservices architecture bridging CTI and reverse-CTI mechanisms into enterprise CRMs (Salesforce, SAP C4C), enabling seamless, low-latency blended voice and chat workflows.",
    impact:
      "Scaled the platform to reliably support 5,000 concurrent agents handling blended voice and chat workloads — a genuinely production-grade system operating at enterprise scale.",
    askPrompt: "Describe the omnichannel communications platform you built.",
  },
  {
    id: "neuroledger",
    title: "Hackathon Feature: Neuroledger",
    problem: "",
    solution: "",
    impact: "",
    note: "Also worth a look: Neuroledger, a Chainlink hackathon project bridging off-chain LLM-based risk orchestration with deterministic on-chain DeFi execution (Chainlink CRE + Solidity).",
    askPrompt: "Tell me about Neuroledger.",
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Cloud & Architecture",
    items: [
      "AWS",
      "Azure",
      "GCP",
      "Event-Driven Architecture",
      "Microservices",
      "API Gateway Management",
      "gRPC",
      "Serverless",
    ],
  },
  {
    category: "AI & Machine Learning",
    items: [
      "Agentic Workflows",
      "LLM Orchestration",
      "RAG Pipelines",
      "Automated Tool-Calling",
      "Real-Time AI Communications",
    ],
  },
  {
    category: "Data & Streaming",
    items: [
      "Apache Kafka",
      "Redis",
      "PostgreSQL",
      "Real-Time Streaming Analytics",
      "High-Throughput Event Pipelines",
    ],
  },
  {
    category: "Languages & Frameworks",
    items: ["Python", "TypeScript", "Node.js", "Next.js", "Solidity", "C#"],
  },
  {
    category: "DevOps & Tooling",
    items: ["CI/CD", "Docker", "Kubernetes", "Release Coordination"],
  },
  {
    category: "Client & Leadership",
    items: [
      "Solution Workshops",
      "RFP Responses",
      "Technical Demonstrations",
      "Stakeholder Management",
      "Cross-Functional Leadership",
      "Mentorship",
      "Roadmap Planning",
    ],
  },
];

export const enterpriseLogos = [
  { name: "AWS", key: "aws" },
  { name: "Splunk", key: "splunk" },
  { name: "Salesforce", key: "salesforce" },
  { name: "SAP C4C", key: "sap" },
  { name: "MS Dynamics", key: "dynamics" },
  { name: "Genesys", key: "genesys" },
  { name: "Cisco", key: "cisco" },
] as const;

export const chatSuggestions = [
  "What's your strongest enterprise win?",
  "Tell me about the GenAI Copilot",
  "Availability for interviews?",
];
