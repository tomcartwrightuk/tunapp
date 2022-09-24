import logo from './images/logo.svg';
import Tuner from '../Tuner';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Tuner />
      </header>
    </div>
  );
}

export default App;
