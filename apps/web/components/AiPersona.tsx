'use client';

import { useState, useRef } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import MagicRings from './MagicRing';
import SplitText from './SplitText';

export default function AiPersona() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [aiResponseText, setAiResponseText] = useState("Hey there, Ask me anything you want to know.");
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioPlayerRef = useRef(null);
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
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      backgroundColor: 'rgba(9, 9, 11, 0.75)',
      backdropFilter: 'blur(16px)',
      borderRadius: '24px',
      border: '1px solid rgba(63, 63, 70, 0.4)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
      maxWidth: '520px',
      width: '100%',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      
      {/* Header & Dynamic Text Container */}
      <div style={{ marginBottom: '20px', width: '100%' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '10px', letterSpacing: '-0.01em' }}>
          Hashim Ali Mir
        </h2>
        <div style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8px' }}>
          <SplitText
            key={aiResponseText}
            text={aiResponseText}
            className="text-sm text-zinc-300 font-light"
            delay={20}
            duration={0.5}
            splitType="words"
          />
        </div>
      </div>

      {/* Central Visualizer Box with Button Dead-Center */}
      <div style={{
        position: 'relative',
        width: '220px',
        height: '220px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        {/* Magic Rings Animation Container */}
        <div style={{
          position: 'absolute',
          inset: '-40px',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.85
        }}>
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
          <div style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.3)',
            animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
          }} />
        )}
        
        {/* Perfectly Centered Interactive Mic Button */}
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onMouseLeave={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          disabled={isProcessing}
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            border: 'none',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            background: isProcessing 
              ? '#27272a' 
              : isRecording 
                ? '#ef4444' 
                : 'linear-gradient(135deg, #0891b2 0%, #4f46e5 100%)',
            boxShadow: isRecording 
              ? '0 0 35px rgba(239,68,68,0.7)' 
              : '0 0 25px rgba(6,182,212,0.4)',
            transform: isRecording ? 'scale(0.95)' : 'scale(1)',
            transition: 'all 0.2s ease'
          }}
        >
          {isProcessing ? (
            <Loader2 className="w-7 h-7 text-white animate-spin" />
          ) : isRecording ? (
            <Square className="w-6 h-6 text-white fill-white" />
          ) : (
            <Mic className="w-7 h-7 text-white" />
          )}
        </button>
      </div>

      {/* Interactive Status Indicator */}
      <div style={{ fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.15em', height: '20px', textTransform: 'uppercase' }}>
        {isProcessing ? (
          <span style={{ color: '#22d3ee' }}>Processing Context...</span>
        ) : isRecording ? (
          <span style={{ color: '#f87171' }}>Listening... (Release)</span>
        ) : isPlaying ? (
          <span style={{ color: '#818cf8' }}>Speaking...</span>
        ) : (
          <span style={{ color: '#71717a' }}>Hold mic to talk</span>
        )}
      </div>
    </div>
  );
}