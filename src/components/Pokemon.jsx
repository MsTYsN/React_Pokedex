import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Pokemon.css';

function Pokemon({ item }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      //console.log(item.url);
      const { data } = await axios.get(item.url);
      setPokemon(data);
      //console.log(data);
    };
    fetchData();
  }, [item.url]);

  if (pokemon == null) {
    return;
  }

  return (
    <div className="card">
      <img
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
      />
      <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <div className="types">
        {pokemon.types.map((t, index) => (
          <span
            key={index}
            style={{
              background:
                t.type.name.toLowerCase() === 'normal'
                  ? '#aa9'
                  : t.type.name.toLowerCase() === 'fire'
                  ? '#f42'
                  : t.type.name.toLowerCase() === 'water'
                  ? '#39f'
                  : t.type.name.toLowerCase() === 'electric'
                  ? '#fc3'
                  : t.type.name.toLowerCase() === 'grass'
                  ? '#7c5'
                  : t.type.name.toLowerCase() === 'ice'
                  ? '#6cf'
                  : t.type.name.toLowerCase() === 'fighting'
                  ? '#b54'
                  : t.type.name.toLowerCase() === 'poison'
                  ? '#a59'
                  : t.type.name.toLowerCase() === 'ground'
                  ? '#db5'
                  : t.type.name.toLowerCase() === 'flying'
                  ? '#89f'
                  : t.type.name.toLowerCase() === 'psychic'
                  ? '#f59'
                  : t.type.name.toLowerCase() === 'bug'
                  ? '#ab2'
                  : t.type.name.toLowerCase() === 'rock'
                  ? '#ba6'
                  : t.type.name.toLowerCase() === 'ghost'
                  ? '#66b'
                  : t.type.name.toLowerCase() === 'dragon'
                  ? '#76e'
                  : t.type.name.toLowerCase() === 'dark'
                  ? '#754'
                  : t.type.name.toLowerCase() === 'steel'
                  ? '#aab'
                  : '#e9e',
            }}
          >
            {t.type.name}
          </span>
        ))}
      </div>
      <div className="pokemon-stats">
        {pokemon.stats.map((s, index) => (
          <div className="stat" key={index}>
            <div className="stat-label">
              {s.stat.name === 'special-attack'
                ? 's-attack'
                : s.stat.name === 'special-defense'
                ? 's-defense'
                : s.stat.name}
            </div>
            <progress value={s.base_stat + s.effort} max="255"></progress>
            <span className="stat-value">{s.base_stat + s.effort}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pokemon;
