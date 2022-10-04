import type { SagaIterator } from "redux-saga";
import {
  call,
  takeEvery,
  put
} from "redux-saga/effects";
import {
  requestMediaPermissions
} from 'mic-check';
import { appIsReady, setMicPermissionsNotGranted, setMicPermissionsGranted } from '../reducers/tuner';

const { ipc } = window;

const requestPermissionState = async () => {
  const desktopPermissionState = await ipc.getMicPermissionState();
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
  if (!permissionState) {
    yield put(setMicPermissionsNotGranted());
  } else {
    yield put(setMicPermissionsGranted());
  }
}

const requestPermissionIfMac = function*(): SagaIterator {
  const platform = yield call(ipc.platform);
  if (platform === "darwin") {
    const permissionState = yield call(ipc.requestMicPermissions);
    if (permissionState) {
      yield put(setMicPermissionsGranted());
    };
  }
}

export default function*(): SagaIterator {
  yield takeEvery(appIsReady.type, checkForPermissions);
  yield takeEvery(setMicPermissionsNotGranted.type, requestPermissionIfMac);
}
