import { connect } from "react-redux";
import { toggleTuning, stopTuning } from "../../reducers/tuner";
import type { RootState } from "../../app/store"

import { MicPermission } from "./MicPermission";

const mapStateToProps = (state: RootState) => ({
  micPermissionGranted: state.tuner.micPermissionGranted,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleTuning: () => {
    dispatch(toggleTuning())
  },
  stopTuning: () => {
    dispatch(stopTuning())
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MicPermission);
