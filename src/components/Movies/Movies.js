import React, { useState, useEffect } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import './Movies.css';
import Footer from '../Footer/Footer';
import MoviesApi from '../../utils/MoviesApi';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const calculateVisibleMovies = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      return 12;
    } else if (screenWidth >= 768) {
      return 8;
    } else if (screenWidth >= 320 && screenWidth <= 480) {
      return 5;
    }
    return 5;
  };

  const [visibleMovies, setVisibleMovies] = useState(calculateVisibleMovies());

  useEffect(() => {
    const handleResize = () => {
      setVisibleMovies(calculateVisibleMovies());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const loadMoreMovies = () => {
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + calculateVisibleMovies());
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
      <SearchForm setSearchQuery={setSearchQuery} />
      <MoviesCardList
        filteredMovies={filteredMovies}
        visibleMovies={visibleMovies}
        movies={movies}
      />
      <button onClick={loadMoreMovies} className='movies__button' type='button'>
        Ещё
      </button>
      <Footer />
    </main>
  );
}

export default Movies;
