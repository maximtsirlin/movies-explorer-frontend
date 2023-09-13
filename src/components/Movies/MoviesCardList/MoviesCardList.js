import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ visibleMovies, loadMoreMovies }) {
  return (
    <ul className='movies-card-list'>
      <MoviesCard />
    </ul>
  )
}

export default MoviesCardList;