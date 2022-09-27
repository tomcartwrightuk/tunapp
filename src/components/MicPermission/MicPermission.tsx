import styles from "../Tuner/Tuner.module.css";

type MicPermissionProps = {
  micPermissionGranted: boolean;
}

export function MicPermission({ micPermissionGranted }: MicPermissionProps): JSX.Element {
  return (
    <>
      {micPermissionGranted ? (
        <h1>🎤 Permission granted!</h1>
      ) : (
        <h1>Give us some 🎤 permissions will ya</h1>
      )}
    </>
  );
}
