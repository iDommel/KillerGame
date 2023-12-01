import './App.css';
import Board from './components/board';
import PlayerForm from './components/playerform';
import './components/styles.css';

function App() {
  return (
    <div className="App" id='main'>
      <Board />
      <PlayerForm />
    </div>
  );
}

export default App;
