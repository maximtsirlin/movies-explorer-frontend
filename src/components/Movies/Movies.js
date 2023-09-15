import React, { useState, useEffect } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import './Movies.css';
import Footer from '../Footer/Footer';
import MoviesApi from '../../utils/MoviesApi';

function Movies() {
  const [visibleMovies, setVisibleMovies] = useState(12);
  const [movies, setMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const loadMoreMovies = () => {
    setVisibleMovies(visibleMovies + 12);
  };

  useEffect(() => {
    MoviesApi.getMovies().then(result => {
      setMovies(result);
    });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className='movies'>
      <SearchForm
        setSearchQuery={setSearchQuery}
      />
      <MoviesCardList
        filteredMovies={filteredMovies}
        visibleMovies={visibleMovies}
        movies={movies}
      />
      <button onClick={loadMoreMovies} className='movies__button' type='button'>Ещё</button>
      <Footer />
    </main>
  );
}

export default Movies;
