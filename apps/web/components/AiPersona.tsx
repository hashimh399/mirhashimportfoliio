'use client';

import { useState, useRef } from 'react';
import { Mic, Square, Loader2, X } from 'lucide-react';
import MagicRings from './MagicRing';
import SplitText from './SplitText';

interface AiPersonaProps {
  onClose?: () => void;
}

export default function AiPersona({ onClose }: AiPersonaProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [aiResponseText, setAiResponseText] = useState("Hi , Ask me how can i help yow solve and scale !");
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const recordingStartTimeRef = useRef(0);

  const startRecording = async () => {
    try {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.currentTime = 0;
        setIsPlaying(false);
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const recordingDuration = Date.now() - recordingStartTimeRef.current;
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

        if (recordingDuration < 500 || audioBlob.size === 0) {
          return;
        }

        setIsProcessing(true);
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');

        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
          const response = await fetch(`${apiUrl}/api/voice`, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) throw new Error('Voice API failed');

          const encodedText = response.headers.get('X-AI-Text');
          if (encodedText) {
            setAiResponseText(decodeURIComponent(encodedText));
          }

          const responseBlob = await response.blob();
          const audioUrl = URL.createObjectURL(responseBlob);
          
          const audio = new Audio(audioUrl);
          audioPlayerRef.current = audio;
          
          audio.onplay = () => setIsPlaying(true);
          audio.onended = () => setIsPlaying(false);
          
          audio.play();
        } catch (error) {
          console.error('Error fetching AI response:', error);
          alert("Failed to connect to the AI brain.");
        } finally {
          setIsProcessing(false);
        }
      };

      recordingStartTimeRef.current = Date.now();
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Microphone access is required.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl w-full text-center">
      
      {/* Mobile Close Button (Only renders if onClose prop is provided) */}
      {onClose && (
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header & Dynamic Text Container */}
      <div className="mb-4 w-full">
        <h2 className="text-sm font-semibold text-white mb-2 tracking-wide uppercase">
          AI PERSONA
        </h2>
        <div className="min-h-[50px] flex items-center justify-center px-2">
          <SplitText
            key={aiResponseText}
            text={aiResponseText}
            className="text-xs text-neutral-300 font-light"
            delay={20}
            duration={0.5}
            splitType="words"
            onLetterAnimationComplete={() => {}}
          />
        </div>
      </div>

      {/* Central Visualizer Box with Button Dead-Center */}
      <div className="relative w-32 h-32 flex items-center justify-center mb-4">
        
        {/* Magic Rings Animation Container */}
        <div className="absolute -inset-10 pointer-events-none flex items-center justify-center opacity-85">
          <MagicRings 
            color="#06B6D4" 
            colorTwo="#4F46E5" 
            ringCount={4} 
            speed={isPlaying || isRecording ? 2.5 : 0.6} 
            hoverScale={1.1}
          />
        </div>

        {/* Recording Ping Effect */}
        {isRecording && (
          <div className="absolute w-20 h-20 rounded-full bg-red-500/30 animate-ping" />
        )}
        
        {/* Perfectly Centered Interactive Mic Button */}
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onMouseLeave={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          disabled={isProcessing}
          className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-none transition-all duration-200 ${
            isProcessing ? 'bg-zinc-800 cursor-not-allowed' : 
            isRecording ? 'bg-red-500 scale-95 shadow-[0_0_30px_rgba(239,68,68,0.6)] cursor-pointer' : 
            'bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer hover:scale-105'
          }`}
        >
          {isProcessing ? (
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          ) : isRecording ? (
            <Square className="w-5 h-5 text-white fill-white" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Interactive Status Indicator */}
      <div className="text-[10px] font-mono tracking-[0.15em] h-5 uppercase">
        {isProcessing ? (
          <span className="text-cyan-400">Processing Context...</span>
        ) : isRecording ? (
          <span className="text-red-400">Listening... (Release)</span>
        ) : isPlaying ? (
          <span className="text-indigo-400">Speaking...</span>
        ) : (
          <span className="text-zinc-500">Hold mic to talk</span>
        )}
      </div>
    </div>
  );
}