import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import getTypeColor from '@/data/colors';

const PokeList = ({ pokemon, onSearchChange, loading, pokemonCount }) => {
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  if (loading) {
    return (
      <div className="full-page-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className={`container mt-4 ${suggestionsVisible ? 'suggestions-visible' : ''}`}>
      <h2 className="mb-4">Pokémon List</h2>

      <SearchBar 
        onSearchChange={onSearchChange} 
        onSuggestionsVisible={setSuggestionsVisible} 
      />

      <div className="table-responsive"> 
        <table className="table table-striped table-hover pokemon-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th style={{ width: '200px' }}>Types</th>
              <th className="hideOnMobile text-center">Details</th> {/* Move "Details" column to the far right */}
            </tr>
          </thead>
          <tbody>
            {pokemon.length > 0 ? pokemon.map((pokemonItem, index) => (
              <tr key={`${pokemonItem.name}-${index}`}>
                <td>{pokemonCount - pokemon.length + index + 1}</td>
                <td>
                  <Link href={`/details/${pokemonItem.name}`} className="text-decoration-none">
                    {pokemonItem.name.charAt(0).toUpperCase() + pokemonItem.name.slice(1)}
                  </Link>
                </td>
                <td>
                  <div
                    className={`d-flex justify-content-${pokemonItem.types?.length === 1 ? 'start' : 'between'} align-items-center`}
                    style={{ minWidth: '150px' }}
                  >
                    {pokemonItem.types?.map((typeObj, idx) => {
                      const typeName = typeof typeObj === 'string' ? typeObj : typeObj.type.name;
                      return (
                        <span
                          key={idx}
                          className="badge me-1"
                          style={{
                            backgroundColor: getTypeColor(typeName),
                            color: '#fff',
                            padding: '0.4em 0.6em',
                            fontSize: '0.9rem',
                            minWidth: '70px',
                            textAlign: 'center',
                          }}
                        >
                          {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="hideOnMobile text-center">
                  <Link href={`/details/${pokemonItem.name}`} className="btn btn-sm btn-outline-primary">
                    View Details
                  </Link>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4">No Pokémon found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PokeList;
