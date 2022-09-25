import type { SagaIterator } from "redux-saga";
import { eventChannel } from "redux-saga";
import {
  call,
  takeEvery,
  put
} from "redux-saga/effects";
import generateAnalyser from "./generateAnalyser";
import { toggleTuning, stopTuning, setCurrentPitch, setCurrentNote } from '../reducers/tuner'
import noteData from '../utils/pitch-to-notes.json';

const createAnalyzerChannel = (stream: any) => {
  const generator = generateAnalyser(stream)
  // @ts-ignore
  return eventChannel(generator);
}

const getStream = async () => {
  const mediaConstants = { audio: true };
  return await navigator.mediaDevices.getUserMedia(mediaConstants);
}

const stopMediaCapture = (analyserChannel: any) => {
  analyserChannel.close()
}

const putCurrentPitch = function* (data: any) {
  yield put(setCurrentPitch(data));
}

const calculatePitchAccuracy = function* (data: any) {
  const pitch = data.payload.pitch;
  const nearestNote = noteData.find((note) =>
    (pitch > note.lowerBound && pitch < note.upperBound)
  ) || noteData[0];

  console.log({nearestNote });
  
  const percentage = (pitch-nearestNote.lowerBound) / (nearestNote.upperBound - nearestNote.lowerBound)
  yield put(setCurrentNote({currentNote: nearestNote, percentage }));
}

const startTuning = function* (): SagaIterator {
  const stream = yield call(getStream);
  const analyserChannel = yield call(createAnalyzerChannel, stream);
  yield takeEvery(analyserChannel, putCurrentPitch);
  yield takeEvery(stopTuning.type, stopMediaCapture, analyserChannel);
}

export default function*() {
  yield takeEvery(toggleTuning.type, startTuning);
  yield takeEvery(setCurrentPitch.type, calculatePitchAccuracy);
}
