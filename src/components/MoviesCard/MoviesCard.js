import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

const MoviesCard = ({ favorites, addToFavorites, removeFromFavorites, movie }) => {
  const location = useLocation();

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      if (remainingMinutes > 0) {
        return `${hours} ч ${remainingMinutes} мин`;
      }
      return `${hours} ч`;
    }

    return `${remainingMinutes} мин`;
  };

  const handleClick = (movie) => {
    if (favorites.some((favMovie) => favMovie.movieId === movie.movieId)) {
      removeFromFavorites(movie);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="movies-card" key={movie._id}>
      <div className="movies-card__about">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <p className="movies-card__duration">{formatDuration(movie.duration)}</p>
      </div>
      <a href={movie.trailerLink} className="movies-card__link">
        <img
          className="movies-card__image"
          src={movie.image.url ? 'https://api.nomoreparties.co' + movie.image.url : movie.image}
          alt={movie.nameRU}
        />
      </a>
      {location.pathname === '/movies' && (
        <button
          className={`movies-card__add ${favorites.some((favMovie) => favMovie.movieId === movie.movieId) ? 'movies-card__add_active' : ''}`}
          onClick={() => handleClick(movie)}
        >
          Сохранить
        </button>
      )}

      {location.pathname === '/saved-movies' && favorites.some((favMovie) => favMovie.movieId === movie.movieId) ? (
        <button
          className="movies-card__add movies-card__add_delete"
          onClick={() => {
            removeFromFavorites(movie);
          }}
        >
          Удалить из избранного
        </button>
      ) : null}
    </div>
  );
};

export default MoviesCard;
