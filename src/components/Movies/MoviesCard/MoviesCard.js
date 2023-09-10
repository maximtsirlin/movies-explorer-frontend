import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { moviesData, moviesDataSave } from "../../../utils/constants";

function MoviesCard() {
  const location = useLocation();


  return (
    <>
      {location.pathname === '/movies' ? (
        moviesData.map((movie, index) => (
          <div key={index} className='movies-card'>
            <div className='movies-card__about'>
              <h2 className='movies-card__title'>{movie.title}</h2>
              <p className='movies-card__duration'>{movie.duration}</p>
              {movie.activeLike && <button className='movies-card__like movies-card__like_active' />}
            </div>
            <img src={movie.image} alt={movie.title} className='movies-card__image' />
            <button className={`movies-card__add ${movie.isSaved ? 'movies-card__add_active' : ''}`}>
              {/* {movie.isSaved ? 'Сохранить' : 'Удалить'} */}
            </button>
          </div>
        ))
      ) : (
        moviesDataSave.map((movie, index) => (
          <div key={index} className='movies-card'>
            <div className='movies-card__about'>
              <h2 className='movies-card__title'>{movie.title}</h2>
              <p className='movies-card__duration'>{movie.duration}</p>
              {movie.deleteButton && <button className='movies-card__delete' />}
            </div>
            <img src={movie.image} alt={movie.title} className='movies-card__image' />
            <button className={`movies-card__add ${movie.isSaved ? 'movies-card__add_delete' : ''}`}>
              {/* {movie.isSaved ? 'Сохранить' : 'Удалить'} */}
            </button>
          </div>
        ))
      )}
    </>
  );
}

export default MoviesCard;
