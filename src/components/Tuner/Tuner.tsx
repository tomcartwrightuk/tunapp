import TunerButton from "../TunerButton";
import styles from "./Tuner.module.css";

type TunerProps = {
  currentFrequency: number;
}

export function Tuner({ currentFrequency }: TunerProps) {
  return (
    <div className={styles.row}>
      <TunerButton />
      <h1>{currentFrequency}</h1>
    </div>
  );
}
