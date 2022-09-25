import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface NoteInfo {
  pitch: number;
  upperBound: number;
  lowerBound: number;
  note: string;
}
export interface TunerState {
  currentlyTuning: boolean;
  currentPitch: number;
  roundedFreq: number;
  currentNote: NoteInfo;
}

const initialNote: NoteInfo = {
  pitch: 0,
  upperBound: 0,
  lowerBound: 0,
  note: '-'
}

const initialState: TunerState = {
  currentlyTuning: false,
  currentPitch: 0,
  roundedFreq: 0,
  currentNote: initialNote
};

export const tunerSlice = createSlice({
  name: 'tuner',
  initialState,
  reducers: {
    toggleTuning: (state) => ({
      ...state,
      currentlyTuning: !state.currentlyTuning
    }),
    stopTuning: (state) => ({
      ...state,
      currentlyTuning: false
    }),
    setCurrentPitch: (state, action) => ({
      ...state,
      currentPitch: action.payload.pitch
    }),
    setCurrentNote: (state, action) => ({
      ...state,
      currentNote: action.payload.currentNote
    })
  }
});

export const { toggleTuning, stopTuning, setCurrentPitch, setCurrentNote } = tunerSlice.actions;

export const selectCurrentlyTuning = (state: RootState) => state.tuner.currentlyTuning;

export default tunerSlice.reducer;
