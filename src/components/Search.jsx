import React, { useState } from 'react';
import './Search.css';

function Search({ pokemonList, dispatch }) {
  const [search, setSearch] = useState('');
  const searchHandler = () => {
    dispatch({
      type: 'FILTER_SUCCESS',
      payload:
        search !== ''
          ? pokemonList.filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase())
            )
          : pokemonList,
    });
  };
  return (
    <div>
      <input
        type="search"
        placeholder="Search A Pokemon By Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchHandler}>Search</button>
    </div>
  );
}

export default Search;
