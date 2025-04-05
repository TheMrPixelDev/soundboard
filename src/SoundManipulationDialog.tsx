import { ChangeEvent, useState } from "react";
import { mutateSound, Sound, submitSound } from "./queries";

const isNotBlank = (value?: string) =>
  value !== undefined && value.length > 0 && value.replace(" ", "").length > 0;

export const SoundManipulationDialog = (props: { sound?: Sound }) => {
  const isUploadDialog = props.sound === undefined;
  const [open, setOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [name, setName] = useState<string>(props.sound?.name ?? "");
  const [description, setDescription] = useState<string>(
    props.sound?.description ?? ""
  );
  const [source, setSource] = useState<string>(props.sound?.source ?? "");
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const clear = () => {
    setFile(undefined);
    setName("");
    setDescription("");
    setSource("");
  };

  const handleSubmit = () => {
    if (file !== undefined && isNotBlank(name) && isNotBlank(source)) {
      setUploading(true);
      submitSound(name, description, source, file)
        .then(() => {
          alert("Upload successful!");
          setUploading(false);
          clear();
          window.location.reload();
        })
        .catch(() => {
          alert("Error while uploading...");
          setUploading(false);
        });
    }
  };

  const handleEdit = () => {
    if (isNotBlank(name) && isNotBlank(source) && props.sound)
      mutateSound(name, description, source, props.sound.id)
        .then(() => window.location.reload())
        .catch(() => alert("Error while updating..."));
  };

  return (
    <>
      <button className="circle transparent" onClick={() => setOpen(!open)}>
        <i>{isUploadDialog ? "upload" : "edit"}</i>
      </button>
      <div className={`overlay blur ${open && "active"}`}></div>
      <dialog open={open}>
        <h5>Add Sound</h5>
        <br />
        <div>
          <div className="field label border">
            <input
              disabled={uploading}
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Name *</label>
          </div>
          <div className="field label border">
            <input
              disabled={uploading}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Description</label>
          </div>
          <div className="field label border">
            <input
              disabled={uploading}
              value={source}
              type="text"
              onChange={(e) => setSource(e.target.value)}
            />
            <label>Source (URL) *</label>
          </div>
          <button disabled={uploading}>
            <i>attach_file</i>
            <span>File</span>
            <input
              disabled={uploading}
              type="file"
              onChange={handleFileChange}
            />
          </button>
          <br />
        </div>
        <nav className="right-align no-space">
          <button
            disabled={uploading}
            onClick={isUploadDialog ? handleSubmit : handleEdit}
            className="border"
          >
            {uploading ? (
              <progress className="small circle" />
            ) : (
              <>{isUploadDialog ? "Upload" : "Save"}</>
            )}
          </button>
          <div className="space"></div>
          <button
            disabled={uploading}
            onClick={() => {
              setOpen(false);
              if (isUploadDialog) {
                clear();
              }
            }}
            className="border"
          >
            Close
          </button>
        </nav>
      </dialog>
    </>
  );
};
