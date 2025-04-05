import { Sound } from "./queries";
import { SoundButton } from "./SoundButton";
import { SoundManipulationDialog } from "./SoundManipulationDialog";

export const SoundCard = (props: { sound: Sound }) => {
  const { name, description } = props.sound;

  return (
    <article>
      <h5>{name}</h5>
      <p>{description}</p>
      <nav>
        <SoundButton sound={props.sound} />
        <SoundManipulationDialog sound={props.sound} />
      </nav>
    </article>
  );
};
