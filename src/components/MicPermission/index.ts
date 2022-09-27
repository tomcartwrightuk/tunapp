import { connect } from "react-redux";
import type { RootState } from "../../app/store"

import { MicPermission } from "./MicPermission";

const mapStateToProps = (state: RootState) => ({
  micPermissionGranted: state.tuner.micPermissionGranted,
});

export default connect(mapStateToProps, null)(MicPermission);
