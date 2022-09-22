import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';

export interface TunerState {
  currentlyTuning: boolean;
  frequency: number;
  roundedFreq: number;
  note: string;
}

const initialState: TunerState = {
  currentlyTuning: false,
  frequency: 0,
  roundedFreq: 0,
  note: '-'
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'tuner/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const tunerSlice = createSlice({
  name: 'tuner',
  initialState,
  reducers: {
    toggleTuning: (state) => ({
      ...state,
      currentlyTuning: !state.currentlyTuning
    }),
  },
});

export const { toggleTuning } = tunerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.tuner.value)`
export const selectCurrentlyTuning = (state: RootState) => state.tuner.currentlyTuning;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default tunerSlice.reducer;
