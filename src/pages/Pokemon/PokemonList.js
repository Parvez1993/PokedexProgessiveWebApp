import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);


  // Add these state variables at the top of the App component
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 10; // Number of Pokémon to display per page

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15');
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchPokemonData();
  }, []);

  async function searchPokemon() {
    if (searchInput.trim() === '') return;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`);
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResult(null);
    }
  }

  async function fetchPokemonData(page) {
    try {
      const offset = (page - 1) * pokemonPerPage;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`);
      const data = await response.json();
      setPokemonList(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokemon PWA</h1>
        <div className="search">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Pokemon..."
          />
          <button onClick={searchPokemon}>Search</button>
        </div>
      </header>
      <main className="pokemon-list">
        {searchResult ? (
          <div className="pokemon-card">
            <img src={searchResult.sprites.front_default} alt={searchResult.name} />
            <h2>{searchResult.name}</h2>
          </div>
        ) : (
          pokemonList.map((pokemon, index) => (
            <div className="pokemon-card" key={index}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
                alt={pokemon.name}
              />
              <Link to={`/pokemon/${pokemon.name}`}><h2>{pokemon.name}</h2></Link>
            </div>
          ))
        )}
      </main>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
            fetchPokemonData(currentPage - 1);
          }}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={pokemonList.length < pokemonPerPage}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            fetchPokemonData(currentPage + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PokemonList