import { compose } from "../../utils/fp";
import { connect } from "react-redux";
import { toggleTuning } from "../../reducers/tuner";
import type { RootState } from "../../app/store"

import { TunerButton } from "./TunerButton";

const mapStateToProps = (state: RootState) => ({
  isCurrentlyTuning: state.tuner.currentlyTuning,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleTuning: () => {
    dispatch(toggleTuning())
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TunerButton);
