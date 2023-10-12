import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';


const MoviesCard = ({ favorites, addToFavorites, removeFromFavorites, movie }) => {
  const location = useLocation();

  return (
    <div className="movies-card" key={movie._id}>
      <div className="movies-card__about">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <p className="movies-card__duration">{movie.duration}</p>
      </div>
      <img
        className="movies-card__image"
        src={movie.image.url ? 'https://api.nomoreparties.co' + movie.image.url : movie.image}
        alt={movie.nameRU}
      />
      {location.pathname === '/movies' && (
        <button
          className={`movies-card__add ${favorites.some((favMovie) => {
            return favMovie.movieId === movie.movieId
          })
            ? 'movies-card__add_active'
            : ''
            }`}
          onClick={() => addToFavorites(movie)}
        >
          Сохранить
        </button>
      )}

      {location.pathname === '/saved-movies' && favorites.some((favMovie) => {
        console.log(favMovie.movieId, movie.movieId, favMovie.id === movie.movieId, movie.movieId);
        return favMovie.movieId === movie.movieId
      }) ? (
        <button
          className="movies-card__add movies-card__add_delete"
          onClick={() => {
            removeFromFavorites(movie)
          }}
        >
          Удалить из избранного
        </button>
      ) : null}
    </div>
  )
};

export default MoviesCard;
