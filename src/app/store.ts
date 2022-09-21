import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tunerReducer from '../features/tuner/tunerSlice';

export const store = configureStore({
  reducer: {
    tuner: tunerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
