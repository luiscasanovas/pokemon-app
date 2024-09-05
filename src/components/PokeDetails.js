import React from 'react';
import Link from 'next/link';
import getTypeColor from '@/data/colors'; 

const PokeDetails = ({ pokemon }) => {
  if (!pokemon) {
    return (
      <div className="text-center full-page-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  const heightInMeters = (pokemon.height / 10).toFixed(1);
  const weightInKilograms = (pokemon.weight / 10).toFixed(1);

  return (
    <div className="container mt-4">
      <div className="row text-center mb-4">
        <div className="col">
          <h1 className="display-4">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
          <h3>ID: {pokemon.id}</h3> 
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4 text-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="img-fluid mb-2"
            style={{ maxWidth: '200px', height: 'auto' }}
          />
          <img
            src={pokemon.sprites.front_shiny}
            alt={pokemon.name}
            className="img-fluid mb-2"
            style={{ maxWidth: '200px', height: 'auto' }}
          />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Types</h2>
          <div className="mb-4">
            {pokemon.types.map((typeObj, index) => {
              const typeName = typeObj.type.name;
              return (
                <span
                  key={index}
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

          <p><strong>Height:</strong> {heightInMeters} m</p>
          <p><strong>Weight:</strong> {weightInKilograms} kg</p>

          <h2>Abilities</h2>
          <ul className="list-group mb-4">
            {pokemon.abilities.map((ability, index) => (
              <li key={index} className="list-group-item">
                {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
              </li>
            ))}
          </ul>

          <h2>Stats</h2>
          <ul className="list-group">
            {pokemon.stats.map((stat, index) => (
              <li key={index} className="list-group-item">
                <strong>{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</strong> {stat.base_stat}
              </li>
            ))}
          </ul>

          <Link href="/" legacyBehavior>
            <a className="btn btn-primary button-uniform button-spacing mt-3">Back to List</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokeDetails;
