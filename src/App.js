import React from "react";
import "./App.css";
import Pokemons from "./features/pokemons/Pokemons";

function App() {
  return (
    <div className="app">
      <div className="tagline">
        <h1>Pokedéx</h1>
        <p>View details of the top 30 pokemon by clicking the view button.</p>
      </div>
      <Pokemons />
    </div>
  );
}

export default App;
