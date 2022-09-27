import logo from './images/logo.svg';
import Tuner from '../Tuner';
import OnLoad from '../OnLoad';
import MicPermission from '../MicPermission';
import './App.css';

type AppProps = {
  onLoad: Function;
};


function App({ onLoad }: AppProps) {
  console.log(onLoad)
  return (
    <OnLoad onLoad={onLoad}>
      <div className="App">
        <header className="App-header">
          <Tuner />
          <MicPermission />
        </header>
      </div>
    </OnLoad>
  );
}

export default App;
