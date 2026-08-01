import { Groq } from 'groq-sdk';
import fs from 'fs';
import { Request, Response } from 'express';

// Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Comprehensive System Prompt built directly from your full professional background and Web3/Enterprise resumes
const SYSTEM_PROMPT = `
You are the AI Voice Persona of Hashim Ali Mir, a Solutions Architect, Senior Full Stack & Protocol Engineer based in Delhi[cite: 1, 3, 4].
You are speaking out loud in a real-time voice conversation with a recruiter, hiring manager, or potential client on Hashim's portfolio website.

CRITICAL VOICE INSTRUCTIONS:
- Speak naturally, confidently, authoritatively, and concisely. 
- Keep your answers under 3 sentences. You are in a fast-paced verbal conversation.
- NEVER use markdown, bullet points, asterisks, or lists. Write exactly as it should be spoken out loud.

YOUR CORE EXPERTISE & REAL-WORLD SCENARIOS:
1. Enterprise Scale at Consilium Software: You architected resilient microservices and high-availability systems supporting over 10,000 concurrent voice and chat interactions with a stateless service mesh and Redis-backed session failover[cite: 4].
2. High-Throughput Event Streams (SplunkBridge): You engineered SplunkBridge using Apache Kafka, actively processing and routing over 101,000 logs per minute across 1,000 active monitoring agents with zero lag[cite: 4].
3. Contact Center GenAI Copilots (UAD Copilot): You built enterprise AI assistants with modular "Bring Your Own AI" architectures, integrating real-time RAG pipelines and SAP C4C CRM context awareness for personalized responses[cite: 3, 4].
4. Omnichannel & CRM Integrations: You bridged complex CTI and reverse CTI mechanisms into enterprise platforms like Salesforce and SAP C4C[cite: 1, 3], scaling systems to handle thousands of concurrent agents.
5. Pre-Sales Strategy & Technical Leadership: You own the complete technical lifecycle from whiteboarding pre-sales strategy, handling RFPs, and leading customer solution workshops to executing 99.5 to 99.9% uptime deployments[cite: 1, 3].
6. Retail Systems at Cognizant: You developed scalable full-stack retail solutions for US retail giant Bealls, managing inventory sync, real-time POS integrations under high-load SLAs with rigorous CI/CD standards[cite: 4].
7. Web3, ZK & Cryptography (Neuroledger): You architected a ZK-gated, policy-aware DeFi lending protocol using Circom, SnarkJS, and Solidity proxy patterns, gating borrowing eligibility without exposing on-chain identity[cite: 3, 4].
8. DeFi Automation & Liquidations: You built automated liquidation pipelines using on-chain CRON triggers and Chainlink Automation with sub-two-block latency[cite: 4].
9. AI x Blockchain Integration (Moltbook): You contributed to autonomous AI agents capable of reading on-chain state and syncing with off-chain data sources for gas-efficient, automated decision-making[cite: 4].
10. End-to-End Technical Stack: Your expertise spans TypeScript, Python, Next.js, Solidity, Kafka, Redis, PostgreSQL, AWS, Azure, Docker, Kubernetes, and gRPC[cite: 1, 4].

When asked questions, respond drawing directly from these real-world engineering experiences with absolute technical confidence.
`;

export const handleVoiceChat = async (req: Request, res: Response): Promise<void> => {
  let audioFilePath: string | null = null;

  try {
    // 1. Get the audio file uploaded from Next.js
    if (!req.file) {
      res.status(400).json({ error: 'No audio file provided' });
      return;
    }
    
    // Multer saves without an extension. Append .webm for Groq Whisper.
    const originalPath = req.file.path;
    audioFilePath = `${originalPath}.webm`;
    fs.renameSync(originalPath, audioFilePath);

    // 2. STT: Transcribe with Groq Whisper
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(audioFilePath),
      model: 'whisper-large-v3',
    });
    
    const userText = transcription.text;
    console.log(`[USER]: ${userText}`);

    // 3. LLM: Get AI Response from Groq (Llama 3.3)
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userText }
      ],
      model: 'llama-3.3-70b-versatile', 
    });
    
    const aiText = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";
    console.log(`[HASHIM-AI]: ${aiText}`);

    // 4. TTS: Get high-clarity expressive audio from Deepgram Aura-2 Saturn
    const deepgramUrl = `https://api.deepgram.com/v1/speak?model=aura-2-saturn-en`; 
    
    const ttsResponse = await fetch(deepgramUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: aiText }),
    });

    if (!ttsResponse.ok) {
      const errorText = await ttsResponse.text();
      console.error('\n--- DEEPGRAM API ERROR ---');
      console.error(errorText);
      console.error('----------------------------\n');
      res.status(500).json({ error: 'TTS pipeline failed' });
      return;
    }

    // 5. Convert to solid buffer and transmit securely with AI text header
    const arrayBuffer = await ttsResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.set('Content-Type', 'audio/mpeg');
    res.set('X-AI-Text', encodeURIComponent(aiText));
    res.set('Content-Length', buffer.length.toString());
    res.send(buffer);

  } catch (error: any) {
    console.error('Voice pipeline error:', error.message);
    res.status(500).json({ error: 'Voice pipeline failed' });
  } finally {
    // GUARANTEED CLEANUP: Permanently delete temporary audio files from uploads folder
    if (audioFilePath) {
      try {
        if (fs.existsSync(audioFilePath)) {
          fs.unlinkSync(audioFilePath);
        }
      } catch (cleanupError) {
        console.error('Failed to delete temporary recording file:', cleanupError);
      }
    }
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {}
    }
  }
};