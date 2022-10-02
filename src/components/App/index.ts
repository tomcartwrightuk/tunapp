import { connect } from "react-redux";
import { appIsReady } from "../../reducers/tuner";
import type { AppDispatch } from "../../app/store";
import type { RootState } from "../../app/store"

import App from "./App";

const mapStateToProps = (state: RootState) => ({
  isCurrentlyTuning: state.tuner.currentlyTuning,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onLoad: () => { dispatch(appIsReady()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
