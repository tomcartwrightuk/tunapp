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

const { ipc } = window;

const requestPermissionState = async () => {
  const desktopPermissionState = await ipc.getMicPermissionState();
  console.log({desktopPermissionState})
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

const crossPlatformPermissionCheck = async () => {
  if (!ipc) {
    return requestBrowserPermissionState()
  } else {
    return requestPermissionState()
  }
}

const checkForPermissions = function*(): SagaIterator {
  const permissionState = yield call(crossPlatformPermissionCheck);
  console.log({permissionState})
  if (!permissionState) {
    yield put(setMicPermissionsNotGranted());
  }
}

const requestPermissionIfMac = function*(): SagaIterator {
  const platform = yield call(ipc.platform);
  if (platform === "darwin") {
    yield call(ipc.requestMicPermissions);
  }
}

export default function*() {
  yield takeEvery(appIsReady.type, checkForPermissions);
  yield takeEvery(setMicPermissionsNotGranted.type, requestPermissionIfMac);
}
