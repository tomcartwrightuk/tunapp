import logo from './images/logo.svg';
import Tuner from '../Tuner';
import OnLoad from '../OnLoad';
import MicPermission from '../MicPermission';
import TunerButton from "../TunerButton";
import './App.css';
import LandingImage from '../LandingImage';

type AppProps = {
  onLoad: Function;
  isCurrentlyTuning: boolean;
};

function App({ onLoad, isCurrentlyTuning }: AppProps) {
  return (
    <OnLoad onLoad={onLoad}>
      <div className="App">
        <header className="App-header">
          <MicPermission />
          <h1 style={{position: "fixed", top: 32}}>Twang!</h1>
          <Tuner show={isCurrentlyTuning}/>
          <LandingImage show={!isCurrentlyTuning} />
          <TunerButton />
        </header>
      </div>
    </OnLoad>
  );
}

export default App;
