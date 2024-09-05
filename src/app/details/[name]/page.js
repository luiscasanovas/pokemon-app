'use client';
import { useEffect, useState } from 'react';
import { fetchPokemonDetails } from '@/data/pokemon';
import PokeDetails from '@/components/PokeDetails';

const DetailsPage = ({ params }) => {
  const { name } = params;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPokemonDetails(name);
        setPokemon(data);
      } catch (error) {
        console.error('Failed to fetch Pokémon details', error);
      }
    };

    fetchData();
  }, [name]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <PokeDetails pokemon={pokemon} />
    </div>
  );
};

export default DetailsPage;
