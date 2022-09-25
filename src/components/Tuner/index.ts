import { connect } from "react-redux";
import type { RootState } from "../../app/store"

import { Tuner } from "./Tuner";

const mapStateToProps = (state: RootState) => ({
  currentPitch: state.tuner.currentPitch,
  currentNote: state.tuner.currentNote,
});

export default connect(mapStateToProps)(Tuner);
