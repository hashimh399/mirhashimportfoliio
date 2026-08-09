import { Groq } from 'groq-sdk';
import fs from 'fs';
import { Request, Response } from 'express';
import { VOICE_SYSTEM_PROMPT } from '../prompts/persona';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const handleVoiceChat = async (req: Request, res: Response): Promise<void> => {
  let audioFilePath: string | null = null;

  try {
    if (!req.file) {
      res.status(400).json({ error: 'No audio file provided' });
      return;
    }

    const originalPath = req.file.path;
    audioFilePath = `${originalPath}.webm`;
    fs.renameSync(originalPath, audioFilePath);

    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(audioFilePath),
      model: 'whisper-large-v3',
    });

    const userText = transcription.text;
    console.log(`[USER]: ${userText}`);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: VOICE_SYSTEM_PROMPT },
        { role: 'user', content: userText },
      ],
      model: 'llama-3.3-70b-versatile',
    });

    const aiText =
      chatCompletion.choices[0]?.message?.content ||
      "I'm sorry, I couldn't process that.";
    console.log(`[HASHIM-AI]: ${aiText}`);

    const deepgramUrl = `https://api.deepgram.com/v1/speak?model=aura-2-saturn-en`;

    const ttsResponse = await fetch(deepgramUrl, {
      method: 'POST',
      headers: {
        Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
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
