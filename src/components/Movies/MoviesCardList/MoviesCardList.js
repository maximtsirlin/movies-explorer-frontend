import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({
  visibleMovies,
  movies,
  filteredMovies }) {

  return (
    <ul className='movies-card-list'>
      <MoviesCard
        visibleMovies={visibleMovies}
        movies={movies}
        filteredMovies={filteredMovies}
      />
    </ul>
  )
}

export default MoviesCardList;