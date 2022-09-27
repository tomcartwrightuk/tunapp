import { all } from "redux-saga/effects";
import tuner from "./tuner";
import permissions from "./permissions";

export default function* rootSaga() {
  yield all([
    permissions(),
    tuner(),
  ]);
}
