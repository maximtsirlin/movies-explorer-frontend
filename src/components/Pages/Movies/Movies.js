import { Routes, Route, Link, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import './Movies.css';
import MoviesApi from '../../../utils/MoviesApi';

function Movies({ initValues, setSearchQuery, loadMoreMovies, setShortFilm }) {
  return (
    <main className='movies'>
      <SearchForm
        initValues={initValues}
        setSearchQuery={setSearchQuery}
        setShortFilm={setShortFilm} />

      <Outlet />

    </main>
  );
}

export default Movies;