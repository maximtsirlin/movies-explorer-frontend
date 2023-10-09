import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({
  visibleMovies,
  movies,
  filteredMovies,
  currentPath,
  favorites,
  addToFavorites,
  removeFromFavorites
}) {

  console.trace('filteredMovies', filteredMovies);

  return (
    <ul className='movies-card-list'>
      {filteredMovies
        .slice(0, visibleMovies)
        .map((movie) => (
          <MoviesCard
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