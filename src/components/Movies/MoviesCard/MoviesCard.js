import React, { Component, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import MainApi from '../../../utils/MainApi';
import { useCurrentUser } from '../../../utils/CurrentUserContext';


const MoviesCard = ({ favorites, addToFavorites, removeFromFavorites, movie }) => {
  const location = useLocation();
  const { token } = useCurrentUser();

  const handleCheckboxClick = async (movie) => {
    console.log(movie, favorites);
    if (!favorites.some((favMovie) => favMovie.movieId === movie.movieId)) {
      console.log('addMovie');
      await MainApi.postMovie(movie, token).then((result) => {
        console.log(result)
        addToFavorites(result);
      }

      )
    } else {
      console.log('removeMovie');
      const removeMovie = favorites.find(el => el.movieId === movie.movieId)
      await MainApi.removeMovie(removeMovie._id, token).then((result) => {
        console.log(result)
        removeFromFavorites(result);

      })
    }


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
          onClick={() => handleCheckboxClick(movie)}
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
          onClick={() => handleCheckboxClick(movie)}
        >
          Удалить из избранного
        </button>
      ) : null}
    </div>
  )
};

export default MoviesCard;
