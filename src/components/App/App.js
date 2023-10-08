import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error';
import Navigation from '../Navigation/Navigation';
import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import { useCurrentUser } from '../../utils/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';

function App() {
  const { currentUser, token } = useCurrentUser();
  const [favorites, setFavorites] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [shortFilm, setShortFilm] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(allMovies);
  const [visibleMovies, setVisibleMovies] = useState(calculateVisibleMovies());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  console.log('loggedIn', token);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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

  function addToFavorites(movie) {
    const tmp = movie.id;
    delete movie['id'];
    movie['movieId'] = tmp;
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites)
  }


  function removeFromFavorites(movie) {
    const updatedFavorites = favorites.filter((favMovie) => favMovie.movieId !== movie.id);
    setFavorites(updatedFavorites)
  }

  useEffect(() => {
    if (location.pathname === '/movies') {
      setMovies(allMovies);
      console.log('allMovies');
    } else {
      setMovies(favorites);
    }
  }, [location.pathname, allMovies, favorites]);

  useEffect(() => {
    if (localStorage.favorites) {
      setFavorites(JSON.parse(localStorage.favorites));
    }
  }, []);

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
      setAllMovies(result);
    });
    mainApi.getSavedMovies(token).then((result) => {setFavorites(result)})
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
    }
  }, [shortFilm, searchQuery, movies]);

  return (
    <>
      <div className="page">
        <Header openMenu={openMenu} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={!!token}>
                <>
                  <Movies
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
                  {filteredMovies.length > visibleMovies && (
                    <button onClick={loadMoreMovies} className="page__button">
                      Ещё
                    </button>
                  )}
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={!!token}>
                <>
                  <Movies
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
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Error />} />

          <Route path="/profile" element={<Profile />} />
          <Route
            path="/signin"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={token ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
        <Navigation isOpen={isMenuOpen} closeMenu={closeMenu} />
      </div>
    </>
  );
}

export default App;