'use client';

import { useEffect, useState } from 'react';
import { fetchPokemonList, fetchPokemonDetails } from '@/data/pokemon';
import PokeList from '@/components/PokeList';
import { useLazyLoad } from '@/hooks/useLazyLoad';

const HomePage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [pokemonCount, setPokemonCount] = useState(0); 

  const loadMorePokemon = async () => {
    if (!nextUrl || loading) return;  

    const scrollYBeforeLoad = window.scrollY;
    setPrevScrollY(scrollYBeforeLoad);
    setLoading(true);

    try {
      const data = await fetchPokemonList(nextUrl);

      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await fetchPokemonDetails(pokemon.name);
          return {
            name: pokemon.name,
            types: details.types,
          };
        })
      );

      setPokemon((prev) => [...prev, ...detailedPokemon]);
      setPokemonCount((prevCount) => prevCount + detailedPokemon.length); 
      setNextUrl(data.next);  

      setTimeout(() => {
        window.scrollTo({ top: prevScrollY, behavior: 'auto' });
      }, 100);
    } catch (error) {
      console.error('Failed to load more Pokémon', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreRef = useLazyLoad(loadMorePokemon, loading);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonList();  

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const details = await fetchPokemonDetails(pokemon.name);
            return {
              name: pokemon.name,
              types: details.types,
            };
          })
        );

        setPokemon(detailedPokemon);
        setPokemonCount(detailedPokemon.length); 
        setNextUrl(data.next);  
      } catch (error) {
        console.error('Failed to load Pokémon', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (query, suggestions) => {
    setSearchQuery(query);
    setSuggestions(suggestions);
  };

  return (
    <div>
      <PokeList
        pokemon={pokemon}
        searchQuery={searchQuery}
        suggestions={suggestions}
        onSearchChange={handleSearchChange}
        loading={loading}
        pokemonCount={pokemonCount} 
      />

      <div className="d-flex justify-content-between mt-4">
        {nextUrl && (
          <div ref={loadMoreRef} className="text-center my-3">
            {loading ? <p>Loading...</p> : <p>Scroll down to load more...</p>}
          </div>
        )}
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            padding: '15px',
            cursor: 'pointer',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
          className="back-to-top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default HomePage;
