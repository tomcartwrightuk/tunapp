import { connect } from "react-redux";
import { appIsReady } from "../../reducers/tuner";
import type { AppDispatch } from "../../app/store";

import App from "./App";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onLoad: () => { dispatch(appIsReady()) },
});

export default connect(null, mapDispatchToProps)(App);
