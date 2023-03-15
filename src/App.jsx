import './App.css';
import Pokemon from './components/Pokemon';
import axios from 'axios';
import { useEffect, useReducer } from 'react';
import Search from './components/Search';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        pokemonList: action.payload,
        filterList: action.payload,
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'FILTER_SUCCESS':
      return { ...state, loading: false, filterList: action.payload };
    default:
      return state;
  }
};

function App() {
  const [{ pokemonList, filterList, loading, error }, dispatch] = useReducer(
    reducer,
    {
      pokemonList: [],
      filterList: [],
      loading: false,
      error: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0'
        );
        //console.log(data);
        dispatch({ type: 'FETCH_SUCCESS', payload: data.results });
      } catch (error) {
        dispatch({ type: 'FETCH_SUCCESS', payload: error });
      }
    };
    fetchData();
  }, []);

  // if (pokemonList == null) {
  //   return;
  // }

  return (
    <div>
      <div className="headerImg">
        <img
          src="https://img.pokemondb.net/design/avif/header-lg.avif"
          alt="pokemon database"
        />
      </div>
      <div className="container">
        <Search pokemonList={pokemonList} dispatch={dispatch} />
        <br />
        <div className="cards-container">
          {loading ? (
            <div className="loading-circle"></div>
          ) : error ? (
            <div className="error">Error</div>
          ) : filterList.length > 0 ? (
            filterList.map((p, index) => <Pokemon item={p} key={index} />)
          ) : (
            <div className="notFound">0 Results Found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
