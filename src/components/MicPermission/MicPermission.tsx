import styles from "../Tuner/Tuner.module.css";

type MicPermissionProps = {
  toggleTuning: () => void;
  stopTuning: () => void;
  micPermissionGranted: boolean;
}

export function MicPermission({ micPermissionGranted }: MicPermissionProps): JSX.Element {
  return (
    <>
      <h1>Permission granted</h1>
      <h1>Give us some 🎤 permissions will ya</h1>
    </>
  );
}
