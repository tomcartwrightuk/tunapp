import TunerButton from "../TunerButton";
import type { NoteInfo } from "../../reducers/tuner";
import styles from "./Tuner.module.css";
import GaugeChart from "react-gauge-chart";

type TunerProps = {
  currentPitch: number;
  currentPercentage: number;
  currentNote: NoteInfo;
};

export function Tuner({ currentPitch, currentNote, currentPercentage }: TunerProps) {
  return (
    <div>
      <TunerButton />
      <h1>{Math.round(currentPitch)}</h1>
      <h1>{currentNote.note}</h1>
      <div className={styles.gauge}>
        <GaugeChart
          id="gauge-chart4"
          animate={false}
          nrOfLevels={5}
          arcsLength={[0.2375, 0.2375, 0.05, 0.2375, 0.2375]}
          colors={['#EA4228', '#F5CD19', '#5BE12C', '#F5CD19', '#EA4228']}
          arcPadding={0.02}
          cornerRadius={3}
          hideText={true}
          percent={currentPercentage}
        />
      </div>
    </div>
  );
}
