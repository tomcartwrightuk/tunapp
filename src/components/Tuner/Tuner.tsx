import TunerButton from "../TunerButton";
import type { NoteInfo } from "../../reducers/tuner";
import styles from "./Tuner.module.css";
import GaugeChart from "react-gauge-chart";

type TunerProps = {
  currentPercentage: number;
  currentNote: NoteInfo;
  show: boolean;
};

const chartStyle = {
  width: 350,
}

export function Tuner({ currentNote, currentPercentage, show }: TunerProps) {
  return (
    <>
      {show && (
        <div>
          <div className={styles.gauge}>
            <GaugeChart
              id="gauge-chart"
              style={chartStyle}
              animate={false}
              nrOfLevels={5}
              arcsLength={[0.2375, 0.2375, 0.05, 0.2375, 0.2375]}
              colors={["#EA4228", "#F5CD19", "#5BE12C", "#F5CD19", "#EA4228"]}
              arcPadding={0.02}
              cornerRadius={3}
              hideText={true}
              needleColor="#99A1AC"
              needleBaseColor="#020202"
              percent={currentPercentage}
            />
          </div>
          <h1 style={{color: "white", fontSize: 32}}>{currentNote.note}</h1>
        </div>
      )}
    </>
  );
}
