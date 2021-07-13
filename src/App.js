import './App.css';
import PianoBoard from './PianoBoard';

function App() {
  return (
    <div className="App">
      <h1>Synth</h1>
      <h3>Using phone? Rotate.</h3>
      <PianoBoard />
      <h4>(*May have performance issues on some mobile devices.)</h4>
    </div>
  );
}

export default App;
