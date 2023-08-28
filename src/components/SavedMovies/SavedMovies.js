import MoviesCardList from '../../components/Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../../components/Movies/SearchForm/SearchForm';
import './SavedMovies.css';


function SavedMovies() {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList />
    </main>
  )
}

export default SavedMovies;