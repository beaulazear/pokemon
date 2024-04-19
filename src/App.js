import './App.css';
import { PokemonProvider } from './context/pokemon';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <PokemonProvider>
        <Home />
      </PokemonProvider>
    </div>
  );
}

export default App;
