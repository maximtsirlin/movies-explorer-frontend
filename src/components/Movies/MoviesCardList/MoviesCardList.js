import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ visibleMovies, movies }) {

  return (
    <ul className='movies-card-list'>
      <MoviesCard 
        visibleMovies={visibleMovies}
        movies={movies}
      />
    </ul>
  )
}

export default MoviesCardList;