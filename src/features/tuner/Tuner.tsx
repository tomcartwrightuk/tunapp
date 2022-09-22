import { TunerButton } from './tuner_button/TunerButton';
import styles from './Tuner.module.css';

export function Tuner() {
  return (
    <div>
      <div className={styles.row}>
        <TunerButton />
      </div>
    </div>
  );
}
