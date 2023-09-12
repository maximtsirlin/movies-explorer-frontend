import React, { useState, useEffect } from 'react';
import './MoviesCard.css';
import MoviesApi from '../../../utils/MoviesApi';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(12);

  useEffect(() => {
    MoviesApi.getMovies().then(result => {
      setMovies(result);
    });
  }, []);

  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie]);
  };

  const removeFromFavorites = (movie) => {
    const indexToRemove = favorites.findIndex((item) => item._id === movie._id);

    if (indexToRemove !== -1) {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(indexToRemove, 1);
      setFavorites(updatedFavorites);
    }
  };

  const loadMoreMovies = () => {
    setVisibleMovies(visibleMovies + 12);
  };

  return (
    <>
      {movies.slice(0, visibleMovies).map((movie) => (
        <div className="movies-card" key={movie._id}>
          <div className="movies-card__about">
            <h2 className="movies-card__title">{movie.nameRU}</h2>
            <p className='movies-card__duration'>{movie.duration}</p>
          </div>
          <img className='movies-card__image' src={'https://api.nomoreparties.co' + movie.image.url} alt={movie.nameRU} />
          <button className='movies-card__add movies-card__add_active' onClick={() => addToFavorites(movie)}>Добавить в избранное</button>
        </div>
      ))}

      {visibleMovies < movies.length && (
        <button onClick={loadMoreMovies}>Загрузить еще</button>
      )}

      {favorites.map((favorite) => (
        <div className="movies-card">

          <div className="movies-card__about" key={favorite._id}>
            <h2 className='movies-card__title'>{favorite.nameRU}</h2>
            <p className='movies-card__duration'>{favorite.duration}</p>
          </div>
          <img src={'https://api.nomoreparties.co' + favorite.image.url} alt={favorite.nameRU} />
          <button className='movies-card__add movies-card__add_delete' onClick={() => removeFromFavorites(favorite)}>Удалить из избранного</button>
        </div>
      ))}
    </>
  );
}

export default Movies;
