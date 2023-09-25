import React, { useState, useEffect } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import './Movies.css';
import Footer from '../Footer/Footer';
import MoviesApi from '../../utils/MoviesApi';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [shortFilm, setShortFilm] = useState(false);

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

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
    MoviesApi.getMovies().then((result) => {
      setMovies(result);
    });
  }, [currentPath]);

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePathChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  useState(movies);

  useEffect(() => {
    if (searchQuery) {
      setFilteredMovies(
        movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
  }, [searchQuery, movies]);

  useEffect(() => {
    if (shortFilm) {
      setFilteredMovies(movies.filter((movie) => movie.duration < 40));
    }
  }, [shortFilm, movies]);

  useEffect(() => {
    if (!shortFilm && !searchQuery) {
      setFilteredMovies(movies);
      console.log('setFilteredMovies', movies);
    }
  }, [shortFilm, searchQuery, movies]);

  return (
    <main className='movies'>
      <SearchForm setSearchQuery={setSearchQuery} setShortFilm={setShortFilm} />
      <MoviesCardList
        filteredMovies={filteredMovies}
        visibleMovies={visibleMovies}
        movies={movies}
        shortFilm={shortFilm}
        currentPath={currentPath}
        // favorites={favorites}
      />
      <button onClick={loadMoreMovies} className='movies__button' type='button'>
        Ещё
      </button>
      <Footer />
    </main>
  );
}

export default Movies;
