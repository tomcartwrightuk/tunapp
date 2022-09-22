import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import tuner from '../reducers/tuner';
import tunerSaga from '../sagas/tuner'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    tuner,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(sagaMiddleware);
  }
});

sagaMiddleware.run(tunerSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
