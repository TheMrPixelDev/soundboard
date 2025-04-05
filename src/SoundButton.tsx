import { getAudio, Sound } from "./queries";
import { useAudio } from "./useAudio";

export const SoundButton = (props: { sound: Sound }) => {
  const audioFileUrl = getAudio(props.sound);
  const { pause, play, playback } = useAudio(audioFileUrl);

  const buttonTitle = (() => {
    switch (playback) {
      case "IDLE":
        return "Play";
      case "LOADING":
        return "Loading...";
      case "PAUSED":
        return "Continue";
      case "PLAYING":
        return "Pause";
    }
  })();

  return (
    <button
      onClick={
        playback === "IDLE" || playback === "PAUSED"
          ? play
          : playback === "PLAYING"
          ? pause
          : () => void 0
      }
    >
      <i>
        {playback === "IDLE" || playback === "PAUSED" ? (
          <i>play_arrow</i>
        ) : playback === "LOADING" ? (
          <progress className="circle small" />
        ) : playback === "PLAYING" ? (
          <i>pause</i>
        ) : (
          <></>
        )}
      </i>
      {buttonTitle}
    </button>
  );
};
