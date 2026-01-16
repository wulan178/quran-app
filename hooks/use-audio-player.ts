import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

export function useAudioPlayer() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  // Set audio mode untuk autoplay
  useEffect(() => {
    const setupAudio = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true, // Play di mode silent (iOS)
        staysActiveInBackground: true, // Keep playing di background
        shouldDuckAndroid: true, // Lower volume saat notif masuk
      });
    };
    setupAudio();
  }, []);

  // Load dan play audio
  const loadAndPlay = async (uri: string, autoPlay = true) => {
    try {
      setIsLoading(true);
      
      // Unload sound sebelumnya jika ada
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: autoPlay }, // Autoplay
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setIsPlaying(autoPlay);
    } catch (error) {
      console.error('Error loading audio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Callback saat status playback berubah
  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);

      // Auto next ayah saat selesai
      if (status.didJustFinish) {
        setIsPlaying(false);
        // Bisa trigger next ayah di sini
      }
    }
  };

  // Play/Pause
  const togglePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  // Stop
  const stop = async () => {
    if (!sound) return;
    await sound.stopAsync();
    setPosition(0);
  };

  // Seek to position
  const seekTo = async (positionMillis: number) => {
    if (!sound) return;
    await sound.setPositionAsync(positionMillis);
  };

  // Cleanup saat unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return {
    sound,
    isPlaying,
    isLoading,
    duration,
    position,
    loadAndPlay,
    togglePlayPause,
    stop,
    seekTo,
  };
}