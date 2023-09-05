import MoviesCardList from '../../components/Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../../components/Movies/SearchForm/SearchForm';
import './SavedMovies.css';
import Footer from '../Footer/Footer';


function SavedMovies() {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </main>
  )
}

export default SavedMovies;