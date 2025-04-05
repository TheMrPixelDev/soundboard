import { useEffect, useState } from "react";

export type PlaybackState = "IDLE" | "LOADING" | "PLAYING" | "PAUSED";

export const useAudio = (audioUrl: string) => {
  const [playback, setPlayback] = useState<PlaybackState>("IDLE");
  const [audioFile, setAudioFile] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setPlayback("LOADING");
    const audio = new Audio(audioUrl);

    audio.onended = () => {
      setPlayback("IDLE");
    };

    audio.onloadeddata = () => {
      setPlayback("IDLE");
    };

    setAudioFile(audio);
    audio.load();
  }, []);

  const play = () => {
    setPlayback("PLAYING");
    audioFile?.play();
  };

  const pause = () => {
    setPlayback("PAUSED");
    audioFile?.pause();
  };

  return {
    playback,
    play,
    pause,
  };
};
