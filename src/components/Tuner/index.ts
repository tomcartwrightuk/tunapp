import { connect } from "react-redux";
import type { RootState } from "../../app/store"

import { Tuner } from "./Tuner";

const mapStateToProps = (state: RootState) => ({
  currentFrequency: state.tuner.currentFrequency,
});

export default connect(mapStateToProps)(Tuner);
