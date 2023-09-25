import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({
  visibleMovies,
  movies,
  filteredMovies,
  currentPath,
  favorites
 }) {



  return (
    <ul className='movies-card-list'>
      <MoviesCard
        visibleMovies={visibleMovies}
        movies={movies}
        filteredMovies={filteredMovies}
        currentPath={currentPath}
        favorites={favorites}

      />
    </ul>
  )
}

export default MoviesCardList;