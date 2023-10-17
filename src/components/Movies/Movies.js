<<<<<<< HEAD
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import './Movies.css';
import Footer from '../Footer/Footer';
import MoviesApi from '../../utils/MoviesApi';

function Movies({ saved }) {
  const [visibleMovies, setVisibleMovies] = useState(calculateVisibleMovies()); // [12, 8, 5
  const [favorites, setFavorites] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [shortFilm, setShortFilm] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(allMovies);

  function addToFavorites(movie) {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites)
  }

  function removeFromFavorites(movie) {
    const updatedFavorites = favorites.filter((favMovie) => favMovie.id !== movie.id);
    setFavorites(updatedFavorites)
  }

  const loadMoreMovies = () => {
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + calculateVisibleMovies());
  };

  function calculateVisibleMovies() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      return 12;
    } else if (screenWidth >= 768) {
      return 8;
    } else if (screenWidth >= 320 && screenWidth <= 480) {
      return 5;
    }
    return 5;
  }

  useEffect(() => {
    const handleResize = () => {
      setVisibleMovies(calculateVisibleMovies());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Handle route changes using useEffect
    if (saved) {
      setMovies(favorites);
      console.log('allMovies');
    } else {
      setMovies(allMovies);
      // console.log('favorites', favorites);
    }
  }, [allMovies, favorites]);

  useEffect(() => {
    if (localStorage.favorites) {
      setFavorites(JSON.parse(localStorage.favorites));
    }
    // console.log('favorites', localStorage.favorites);
  }, []);

  useEffect(() => {
    MoviesApi.getMovies().then((result) => {
      setAllMovies(result);
    });
  }, []);

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
      // console.log('setFilteredMovies', movies);
    }
  }, [shortFilm, searchQuery, movies]);

  return (
    <main className='movies'>
      <SearchForm
        setSearchQuery={setSearchQuery}
        setShortFilm={setShortFilm}
      />
      <MoviesCardList
        filteredMovies={filteredMovies}
        visibleMovies={visibleMovies}
        movies={allMovies}
        shortFilm={shortFilm}
        favorites={favorites}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
      />
      <button onClick={loadMoreMovies} className='movies__button' type='button'>
        Ещё
      </button>
      <Footer />
    </main>
  );
}

export default Movies;
=======
import {Outlet} from 'react-router-dom';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({initValues, setSearchQuery, setShortFilm}) {
	return (
		<main className='movies'>
			<SearchForm
				initValues={initValues}
				setSearchQuery={setSearchQuery}
				setShortFilm={setShortFilm}/>
			<Outlet/>
		</main>
	);
}

export default Movies;
>>>>>>> level-3
