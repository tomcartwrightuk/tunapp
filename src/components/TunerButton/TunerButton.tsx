import styles from "../Tuner/Tuner.module.css";

type TunerButtonProps = {
  toggleTuning: () => void;
  stopTuning: () => void;
  isCurrentlyTuning: boolean;
}

export function TunerButton({ toggleTuning, stopTuning, isCurrentlyTuning }: TunerButtonProps) {
  return (
    <button className={styles.button} onClick={isCurrentlyTuning ? stopTuning : toggleTuning}>
      {isCurrentlyTuning ? (
        <span>Stop tuning</span>
      ) : (
        <span>Let's get tuning!</span>
      )}
    </button>
  );
}
