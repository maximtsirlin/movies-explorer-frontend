import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ visibleMovies, movies, filteredMovies }) {
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (movie, index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <>
      {location.pathname === '/movies' && (
        <>
          {filteredMovies.slice(0, visibleMovies).map((movie) => (
            <div className="movies-card" key={movie._id}>
              <div className="movies-card__about">
                <h2 className="movies-card__title">{movie.nameRU}</h2>
                <p className='movies-card__duration'>{movie.duration}</p>
              </div>
              <img className='movies-card__image' src={'https://api.nomoreparties.co' + movie.image.url} alt={movie.nameRU} />
              <button className='movies-card__add movies-card__add_active' onClick={() => addToFavorites(movie)}>Добавить в избранное</button>
            </div>
          ))}
        </>
      )}

      {location.pathname === '/saved-movies' && (
        favorites.map((favorite) => (
          <div className="movies-card" key={favorite._id}>
            <div className="movies-card__about">
              <h2 className='movies-card__title'>{favorite.nameRU}</h2>
              <p className='movies-card__duration'>{favorite.duration}</p>
            </div>
            <img className='movies-card__image' src={'https://api.nomoreparties.co' + favorite.image.url} alt={favorite.nameRU} />
            <button className='movies-card__add movies-card__add_delete' onClick={() => removeFromFavorites(favorite)}>
              Удалить из избранного
            </button>
          </div>
        ))
      )}
    </>
  );
}

export default MoviesCard;