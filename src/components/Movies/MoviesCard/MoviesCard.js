import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MoviesCard.css';
import MoviesApi from '../../../utils/MoviesApi';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(12);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    MoviesApi.getMovies().then(result => {
      setMovies(result);
    });
  }, []);

  const addToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter((item) => item._id !== movie._id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const loadMoreMovies = () => {
    setVisibleMovies(visibleMovies + 12);
  };

  return (
    <>
      {location.pathname === '/movies' && (
        movies.slice(0, visibleMovies).map((movie) => (
          <div className="movies-card" key={movie._id}>
            <div className="movies-card__about">
              <h2 className="movies-card__title">{movie.nameRU}</h2>
              <p className='movies-card__duration'>{movie.duration}</p>
            </div>
            <img className='movies-card__image' src={'https://api.nomoreparties.co' + movie.image.url} alt={movie.nameRU} />
            <button className='movies-card__add movies-card__add_active' onClick={() => addToFavorites(movie)}>Добавить в избранное</button>
          </div>
        ))
      )}

      {location.pathname === '/movies' && visibleMovies < movies.length && (
        <button onClick={loadMoreMovies}>Загрузить еще</button>
      )}

      {location.pathname === '/saved-movies' && (
        favorites.map((favorite) => (
          <div className="movies-card" key={favorite._id}>
            <div className="movies-card__about">
              <h2 className='movies-card__title'>{favorite.nameRU}</h2>
              <p className='movies-card__duration'>{favorite.duration}</p>
            </div>
            <img src={'https://api.nomoreparties.co' + favorite.image.url} alt={favorite.nameRU} />
            <button className='movies-card__add movies-card__add_delete' onClick={() => removeFromFavorites(favorite)}></button>
          </div>
        ))
      )}
    </>
  );
}

export default Movies;
