import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { toggleTuning, selectCurrentlyTuning } from "../tunerSlice";
import styles from "../Tuner.module.css";

export function TunerButton() {
  const dispatch = useAppDispatch();
  const isCurrentlyTuning = useAppSelector(selectCurrentlyTuning);

  return (
    <button className={styles.button} onClick={() => dispatch(toggleTuning())}>
      {isCurrentlyTuning ? (
        <span>Stop tuning</span>
      ) : (
        <span>Let's get tuning!</span>
      )}
    </button>
  );
}
