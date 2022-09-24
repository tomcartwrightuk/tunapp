import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface TunerState {
  currentlyTuning: boolean;
  currentFrequency: number;
  roundedFreq: number;
  note: string;
}

const initialState: TunerState = {
  currentlyTuning: false,
  currentFrequency: 0,
  roundedFreq: 0,
  note: '-'
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
      currentFrequency: action.payload.frequency
    })
  }
});

export const { toggleTuning, stopTuning, setCurrentPitch } = tunerSlice.actions;

export const selectCurrentlyTuning = (state: RootState) => state.tuner.currentlyTuning;

export default tunerSlice.reducer;
