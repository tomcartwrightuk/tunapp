import type { SagaIterator } from "redux-saga";
import {
  call,
  takeEvery,
  select
} from "redux-saga/effects";
import generateAnalyser from "./generateAnalyser";
import { toggleTuning, selectCurrentlyTuning } from '../reducers/tuner'

const startTuning = function* (): SagaIterator {
  const currentlyTuning: ReturnType<typeof selectCurrentlyTuning> = yield select(selectCurrentlyTuning);
  if (currentlyTuning) {
    console.log(currentlyTuning);
    const analyser = yield call(generateAnalyser) // all the clever stuff
    // const analyserChannel = createAnalyzerChannel(analyser)
  }
}

export default function*() {
  yield takeEvery(toggleTuning.type, startTuning);

}
