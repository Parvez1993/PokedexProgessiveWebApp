import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom"
import PokemonList from './pages/Pokemon/PokemonList';
import './App.css';
import PokemonDetail from './pages/PokemonDetail/PokemonDetail';
function App() {
  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/pokemon/:name" element={<PokemonDetail />} />
    </Routes>
  );
}

export default App;
