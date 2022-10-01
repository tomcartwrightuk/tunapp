import type { SagaIterator } from "redux-saga";
import {
  call,
  takeEvery,
  put
} from "redux-saga/effects";
import {
  // MediaPermissionsError
  // MediaPermissionsErrorType,
  requestMediaPermissions
} from 'mic-check';

import { appIsReady, setMicPermissionsNotGranted } from '../reducers/tuner';

const requestPermissionState = async () => {
  const desktopPermissionState = await window.ipc.getMicPermissionState();
  return desktopPermissionState === "granted";
}

const requestBrowserPermissionState = async () => {
  try {
    await requestMediaPermissions({audio: true, video: false});
    return true;
  } catch(err) {
    console.log(err)
    return false;
  }
};

const crossPlatformPermssionCheck = async () => {
  if (!window.ipc) {
    return requestBrowserPermissionState()
  } else {
    return requestPermissionState()
  }
}

const checkForPermissions = function*(): SagaIterator {
  const permissionState = yield call(crossPlatformPermssionCheck);
  if (!permissionState) {
    yield put(setMicPermissionsNotGranted());
  }
}

export default function*() {
  yield takeEvery(appIsReady.type, checkForPermissions);
}
