import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { logDOM } from '@testing-library/react';

function MoviesCard({ visibleMovies, movies, filteredMovies = [], currentPath }) {
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();
  const [shortFilm, setShortFilm] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('favorites', favorites);
  }, [favorites]);

  const addToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };


  useEffect(() => {

    console.log('filteredMovies', filteredMovies);
  }, [filteredMovies])



  console.log(filteredMovies)
  return (
    <>
      {filteredMovies
        .filter((movie) => (!shortFilm || parseInt(movie.duration, 10) <= 40))
        .slice(0, visibleMovies)
        .map((movie) => (
          <div className="movies-card" key={movie._id}>
            <div className="movies-card__about">
              <h2 className="movies-card__title">{movie.nameRU}</h2>
              <p className='movies-card__duration'>{movie.duration}</p>
            </div>
            <img className='movies-card__image' src={'https://api.nomoreparties.co' + movie.image.url} alt={movie.nameRU} />
            <button
              className={`movies-card__add ${favorites.map((m) => m.id).includes(movie.id) ? 'movies-card__add_active' : ''}`}
              onClick={() => addToFavorites(movie)}
            >
              Сохранить
            </button>
            {favorites.map((m) => m.id).includes(movie.id) ? (<button className='movies-card__add movies-card__add_delete' onClick={() => removeFromFavorites(favorite, index)}>
              Удалить из избранного
            </button>) : null}

          </div>
        ))}
    </>

  );
}

export default MoviesCard;