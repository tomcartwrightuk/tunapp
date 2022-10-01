import logo from './images/logo.svg';
import Tuner from '../Tuner';
import OnLoad from '../OnLoad';
import MicPermission from '../MicPermission';
import './App.css';

type AppProps = {
  onLoad: Function;
};

function App({ onLoad }: AppProps) {
  return (
    <OnLoad onLoad={onLoad}>
      <div className="App">
        <header className="App-header">
          <MicPermission />
          <Tuner />
        </header>
      </div>
    </OnLoad>
  );
}

export default App;
