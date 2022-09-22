import styles from "../Tuner/Tuner.module.css";

type TunerButtonProps = {
  toggleTuning: () => void;
  isCurrentlyTuning: boolean;
}

export function TunerButton({ toggleTuning, isCurrentlyTuning }: TunerButtonProps) {
  return (
    <button className={styles.button} onClick={toggleTuning}>
      {isCurrentlyTuning ? (
        <span>Stop tuning</span>
      ) : (
        <span>Let's get tuning!</span>
      )}
    </button>
  );
}
