import React, { Component, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

const MoviesCard = ({ visibleMovies, favorites, filteredMovies = [], addToFavorites, removeFromFavorites }) => {
  const location = useLocation();
  const [clickedMovies, setClickedMovies] = useState([]);

  const handleCheckboxClick = (movie) => {
    if (!clickedMovies.includes(movie.id)) {
      addToFavorites(movie);
      setClickedMovies([...clickedMovies, movie.id]);
    } else {
      removeFromFavorites(movie);
      setClickedMovies(clickedMovies.filter((id) => id !== movie.id));
    }
  };

  console.trace('filteredMovies', filteredMovies);
  return (
    <>
      {filteredMovies
        .slice(0, visibleMovies)
        .map((movie) => (
          <div className="movies-card" key={movie._id}>
            <div className="movies-card__about">
              <h2 className="movies-card__title">{movie.nameRU}</h2>
              <p className="movies-card__duration">{movie.duration}</p>
            </div>
            <img
              className="movies-card__image"
              src={'https://api.nomoreparties.co' + movie.image.url}
              alt={movie.nameRU}
            />
            {location.pathname === '/movies' && (
              <button
                className={`movies-card__add ${
                  favorites.some((favMovie) => favMovie.id === movie.id)
                    ? 'movies-card__add_active'
                    : ''
                }`}
                onClick={() => handleCheckboxClick(movie)}
              >
                Сохранить
              </button>
            )}

            {location.pathname === '/saved-movies' && favorites.some((favMovie) => favMovie.id === movie.id) ? (
              <button
                className="movies-card__add movies-card__add_delete"
                onClick={() => removeFromFavorites(movie)}
              >
                Удалить из избранного
              </button>
            ) : null}
          </div>
        ))}
    </>
  );
};

export default MoviesCard;
