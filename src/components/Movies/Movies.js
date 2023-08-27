import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import './Movies.css';

function Movies() {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList />
      <button className='movies__button' type='button'>Ещё</button>
    </main>
  )
}

export default Movies;