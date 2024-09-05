const BASE_URL = 'https://pokeapi.co/api/v2/';

export const fetchPokemonList = async (url = `${BASE_URL}pokemon?limit=20`) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch Pokémon data');
  const data = await response.json();

  return {
    results: data.results,
    next: data.next,
  };
};

export const fetchPokemonDetails = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}pokemon/${name}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
