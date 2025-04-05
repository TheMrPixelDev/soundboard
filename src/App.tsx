import { useEffect, useState } from "react";
import { getSounds, Sound } from "./queries";
import { SoundCard } from "./SoundCard";
import { AppBar } from "./AppBar";

function App() {
  const [sounds, setSounds] = useState<Sound[]>([]);

  useEffect(() => {
    getSounds().then((response) => setSounds(response));
  }, []);

  return (
    <main className="responsive">
      <AppBar />
      <div className="grid medium-space">
        {sounds.map((sound) => (
          <div className="s6 l4" key={`sound-card-${sound.id}`}>
            <SoundCard sound={sound} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
