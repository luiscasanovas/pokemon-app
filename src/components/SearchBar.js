'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchPokemonList } from '@/data/pokemon';

const SearchBar = ({ onSearchChange, onSuggestionsVisible }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setLoading(true);
        const allData = [];
        let url = 'https://pokeapi.co/api/v2/pokemon?limit=50';
        let nextPage = true;

        while (nextPage) {
          const data = await fetchPokemonList(url);
          allData.push(...data.results);
          url = data.next;
          nextPage = !!data.next;
        }

        setAllPokemon(allData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch Pokémon list', error);
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setErrorMessage('');
    setVisibleCount(10); 

    if (query.length > 0) {
      const filteredSuggestions = allPokemon.filter(pokemon =>
        pokemon.name.startsWith(query)
      );
      setSuggestions(filteredSuggestions);
      onSuggestionsVisible(filteredSuggestions.length > 0); 
      if (filteredSuggestions.length === 0) {
        setErrorMessage(`No Pokémon found with the name "${query}".`);
      } else {
        setErrorMessage('');
      }
    } else {
      setSuggestions([]);
      onSuggestionsVisible(false); 
      setErrorMessage('');
    }
  };

  const handleScroll = (e) => {
    const bottomReached = e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight;
    if (bottomReached && visibleCount < suggestions.length) {
      setVisibleCount((prevCount) => prevCount + 10);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const matchedPokemon = allPokemon.find(pokemon =>
      pokemon.name === searchQuery.toLowerCase()
    );

    if (matchedPokemon) {
      router.push(`/details/${searchQuery.toLowerCase()}`);
      setErrorMessage('');
      onSuggestionsVisible(false); 
    } else {
      setErrorMessage(`No Pokémon found with the name "${searchQuery}".`);
    }
  };

  return (
    <div className="position-relative">
      <form onSubmit={handleSearch} className="mb-4 d-flex">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search Pokémon"
          className="form-control me-2"
          disabled={loading}
          style={{ borderRadius: '5px' }}  
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul
          className="list-group w-100 search-suggestions"
          style={{
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            marginTop: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
          onScroll={handleScroll}
        >
          {suggestions.slice(0, visibleCount).map((suggestion, index) => (
            <li
              key={index}
              className="list-group-item bg-light text-dark"
              onClick={() => {
                router.push(`/details/${suggestion.name.toLowerCase()}`);
                onSuggestionsVisible(false); 
              }}
              style={{ cursor: 'pointer' }}
            >
              {suggestion.name.charAt(0).toUpperCase() + suggestion.name.slice(1)}
            </li>
          ))}
        </ul>
      )}

      {errorMessage && (
        <div className="alert alert-warning mt-2">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
