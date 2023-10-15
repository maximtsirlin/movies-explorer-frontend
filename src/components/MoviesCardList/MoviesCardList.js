import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({
  visibleMovies,
  filteredMovies,
  favorites,
  addToFavorites,
  removeFromFavorites
}) {
	
  if (filteredMovies.length === 0) {
    return (
      <div className={'movies-card-list__block'}>
	      <h3>
	        Ничего не найдено!!!
	      </h3>
      </div>
    )
  }

  return (
    <ul className='movies-card-list'>
      {filteredMovies
        .slice(0, visibleMovies)
        .map((movie) => (
          <MoviesCard
            key={movie.movieId}
            favorites={favorites}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            movie={movie}
          />
        ))}
    </ul>
  );

}

export default MoviesCardList;
