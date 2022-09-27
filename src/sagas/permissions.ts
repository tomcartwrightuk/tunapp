import type { SagaIterator } from "redux-saga";
import {
  call,
  takeEvery,
  put
} from "redux-saga/effects";
import { appIsReady, setMicPermissionsNotGranted } from '../reducers/tuner';

const requestPermissionState = async () => {
  return await window.ipc.getMicPermissionState();
}

const checkForPermissions = function*(): SagaIterator {
  if (!window.ipc) {
    console.log("no ipc")
    return;
  }
  const permissionState = yield call(requestPermissionState);
  if (permissionState !== "granted") {
    yield put(setMicPermissionsNotGranted());
  }
}

export default function*() {
  yield takeEvery(appIsReady.type, checkForPermissions);
}
