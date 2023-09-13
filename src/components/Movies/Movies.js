import React, { useState } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import './Movies.css';
import Footer from '../Footer/Footer';

function Movies() {
  const [visibleMovies, setVisibleMovies] = useState(12);

  const loadMoreMovies = () => {
    setVisibleMovies(visibleMovies + 12);
  };

  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList visibleMovies={visibleMovies} loadMoreMovies={loadMoreMovies} />
      <button onClick={loadMoreMovies}>Загрузить еще</button>
      <Footer />
    </main>
  );
}

export default Movies;
