import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface NoteInfo {
  pitch: number;
  upperBound: number;
  lowerBound: number;
  note: string;
}
export interface TunerState {
  currentlyTuning: boolean;
  currentPitch: number;
  currentPercentage: number;
  roundedFreq: number;
  currentNote: NoteInfo;
  micPermissionGranted: boolean;
}

const initialNote: NoteInfo = {
  pitch: 0,
  upperBound: 0,
  lowerBound: 0,
  note: "",
};

const initialState: TunerState = {
  currentlyTuning: false,
  currentPitch: 0,
  currentPercentage: 0.5,
  roundedFreq: 0,
  currentNote: initialNote,
  micPermissionGranted: true,
};

export const tunerSlice = createSlice({
  name: "tuner",
  initialState,
  reducers: {
    toggleTuning: (state) => ({
      ...state,
      currentlyTuning: !state.currentlyTuning,
    }),
    stopTuning: (state) => ({
      ...state,
      currentNote: {
        pitch: 0,
        upperBound: 0,
        lowerBound: 0,
        note: "-"
      },
      currentlyTuning: false,
    }),
    setCurrentPitch: (state, action) => ({
      ...state,
      currentPitch: action.payload.pitch,
    }),
    setCurrentNote: (state, action) => ({
      ...state,
      currentNote: action.payload.currentNote,
      currentPercentage: action.payload.percentage,
    }),
    appIsReady: (state) => ({
      ...state,
      appReady: true,
    }),
    setMicPermissionsNotGranted: (state) => ({
      ...state,
      micPermissionGranted: false,
    }),
    setMicPermissionsGranted: (state) => ({
      ...state,
      micPermissionGranted: true,
    })
  },
});

export const {
  toggleTuning,
  stopTuning,
  setCurrentPitch,
  setCurrentNote,
  appIsReady,
  setMicPermissionsNotGranted,
  setMicPermissionsGranted,
} = tunerSlice.actions;

export const selectCurrentlyTuning = (state: RootState) =>
  state.tuner.currentlyTuning;

export default tunerSlice.reducer;
