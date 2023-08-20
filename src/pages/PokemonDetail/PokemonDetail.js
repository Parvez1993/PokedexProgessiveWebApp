import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './PokemonDetail.css';

function PokemonDetail() {
  const [pokemon, setPokemon] = useState(null);
  const {name}=useParams();

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchPokemonData();
  }, [name]);

  return (
    <div className="pokemon-detail">
      <div className="back-link">
        <Link to="/" className="back-button">Back to List</Link>
      </div>
      {pokemon && (
        <div className="pokemon-card">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h2>{pokemon.name}</h2>
          <div className="info">
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Base Experience: {pokemon.base_experience}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonDetail;
