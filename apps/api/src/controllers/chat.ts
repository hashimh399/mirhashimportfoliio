import { Groq } from 'groq-sdk';
import { Request, Response } from 'express';
import { TEXT_SYSTEM_PROMPT } from '../prompts/persona';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

function normalizeMessages(body: unknown): ChatMessage[] {
  if (!body || typeof body !== 'object') return [];

  const payload = body as {
    messages?: unknown;
    message?: unknown;
  };

  if (Array.isArray(payload.messages)) {
    return payload.messages as ChatMessage[];
  }

  // Convenience: { message: "..." } from quick tests / alternate clients
  if (typeof payload.message === 'string' && payload.message.trim()) {
    return [{ role: 'user', content: payload.message.trim() }];
  }

  return [];
}

export const handleTextChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = normalizeMessages(req.body);

    if (messages.length === 0) {
      console.warn('[chat] bad body:', req.body);
      res.status(400).json({
        error: 'messages array is required',
        hint: 'POST JSON like { "messages": [{ "role": "user", "content": "Hello" }] }',
      });
      return;
    }

    const sanitized = messages
      .filter(
        (m) =>
          m &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.trim().length > 0
      )
      .slice(-20)
      .map((m) => ({ role: m.role, content: m.content.trim() }));

    if (sanitized.length === 0) {
      res.status(400).json({ error: 'No valid user/assistant messages' });
      return;
    }

    if (!process.env.GROQ_API_KEY) {
      res.status(500).json({ error: 'GROQ_API_KEY is not configured' });
      return;
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: TEXT_SYSTEM_PROMPT },
        ...sanitized,
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_tokens: 600,
    });

    const reply =
      chatCompletion.choices[0]?.message?.content ||
      "I'm sorry, I couldn't process that.";

    res.json({ reply });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Text chat error:', message);
    res.status(500).json({ error: 'Chat pipeline failed', detail: message });
  }
};
