import PocketBase from "pocketbase";

const pb = new PocketBase("https://api.soundboard.pxldeveloper.eu");

export type Sound = {
  id: string;
  name: string;
  description?: string;
  source: string;
  updated: Date;
  created: Date;
  audio: string;
};

export const getSounds = async () => {
  return pb.collection("sounds").getFullList<Sound>();
};

export const getAudio = (sound: Sound) => {
  const audioUrl = pb.files.getURL(sound, sound.audio);
  return audioUrl;
};

export const submitSound = async (
  name: string,
  description: string,
  source: string,
  file: File
) => {
  return pb.collection("sounds").create({
    name: name,
    description: description,
    source: source,
    audio: file,
  });
};

export const mutateSound = async (
  name: string,
  description: string,
  source: string,
  id: string
) => {
  return pb.collection("sounds").update(id, {
    name: name,
    description: description,
    source: source,
  });
};
