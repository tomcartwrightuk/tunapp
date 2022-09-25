import TunerButton from "../TunerButton";
import type { NoteInfo } from "../../reducers/tuner";
import styles from "./Tuner.module.css";

type TunerProps = {
  currentPitch: number;
  currentNote: NoteInfo;
}

export function Tuner({ currentPitch, currentNote }: TunerProps) {
  return (
    <div className={styles.row}>
      <TunerButton />
      <h1>{currentPitch}</h1>
      <h1>{currentNote.note}</h1>
    </div>
  );
}
