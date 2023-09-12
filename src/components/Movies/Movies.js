import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import './Movies.css';
import Footer from '../Footer/Footer';


function Movies() {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList />
      <button className='movies__button' type='button'>Ещё</button>
      <Footer />
    </main>
  )
}

export default Movies;