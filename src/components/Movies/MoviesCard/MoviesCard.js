import React from 'react';
import './MoviesCard.css';
import { moviesData } from "../../../utils/constants";


function MoviesCard() {

  return (
    <>
      {moviesData.map((movie, index) => (
        <div className='movies-card' key={index}>
          <div className='movies-card__about'>
            <h2 className='movies-card__title'>{movie.title}</h2>
            <p className='movies-card__duration'>{movie.duration}</p>
          </div>
          <img src={movie.image} alt={movie.title} className='movies-card__image' />
          <button className={`movies-card__add ${movie.isSaved ? 'movies-card__add_active' : ''}`}>
            {/* {movie.isSaved ? 'Сохранить' : 'Удалить'} */}
          </button>
        </div>
      ))}
    </>
  );
}

export default MoviesCard;

