import { SoundManipulationDialog } from "./SoundManipulationDialog";

export const AppBar = () => {
  return (
    <header>
      <nav>
        <SoundManipulationDialog />
        <a
          className="small circle transparent"
          title="Visit project on GitHub"
          href="https://github.com/TheMrPixelDev/soundboard"
        >
          <img className="responsive" src="/github-mark-white.svg" />
        </a>
        <h5 className="max center-align">Soundboard</h5>
        <button className="circle transparent">
          <img className="responsive" src="/icon.png" />
        </button>
      </nav>
    </header>
  );
};
