import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAudioPlayer } from '@/hooks/use-audio-player';

interface AudioPlayerContextType {
  currentAudioUrl: string | null;
  currentSurahName: string | null;
  currentSurahMeaning: string | null;
  isPlaying: boolean;
  isLoading: boolean;
  duration: number;
  position: number;
  playAudio: (audioUrl: string, surahName: string, surahMeaning: string) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  stop: () => Promise<void>;
  seekTo: (positionMillis: number) => Promise<void>;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [currentSurahName, setCurrentSurahName] = useState<string | null>(null);
  const [currentSurahMeaning, setCurrentSurahMeaning] = useState<string | null>(null);
  
  const { isPlaying, isLoading, duration, position, loadAndPlay, togglePlayPause, stop, seekTo } = useAudioPlayer();

  const playAudio = async (audioUrl: string, surahName: string, surahMeaning: string) => {
    // If same audio is already loaded, just toggle play/pause
    if (currentAudioUrl === audioUrl) {
      await togglePlayPause();
      return;
    }
    
    setCurrentAudioUrl(audioUrl);
    setCurrentSurahName(surahName);
    setCurrentSurahMeaning(surahMeaning);
    await loadAndPlay(audioUrl, true);
  };

  const handleStop = async () => {
    await stop();
    setCurrentAudioUrl(null);
    setCurrentSurahName(null);
    setCurrentSurahMeaning(null);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentAudioUrl,
        currentSurahName,
        currentSurahMeaning,
        isPlaying,
        isLoading,
        duration,
        position,
        playAudio,
        togglePlayPause,
        stop: handleStop,
        seekTo,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayerContext() {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayerContext must be used within an AudioPlayerProvider');
  }
  return context;
}
