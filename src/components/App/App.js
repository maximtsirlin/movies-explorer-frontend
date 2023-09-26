import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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

function App() {
  const [movies, setMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [shortFilm, setShortFilm] = useState(false);

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [visibleMovies, setVisibleMovies] = useState(calculateVisibleMovies());

  const navigation = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [registeredError, setRegisteredError] = useState(false);

  const navigate = useNavigate();

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  function handleRegister(name, email, password) {
    MainApi.register(name, email, password)
      .then((data) => {
        if (data) {
          navigate('/signin');
        }
      })
      .catch(() => {
        setRegisteredError(true);
      });
  }


  function calculateVisibleMovies () {
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
  }, []);

  useEffect(() => {

  },);



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
    <div className="page">
      <Header openMenu={openMenu} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies
          setSearchQuery={setSearchQuery}
          loadMoreMovies={loadMoreMovies}
          setShortFilm={setShortFilm}
        />}>
          <Route path="all" element={<MoviesCardList
            filteredMovies={filteredMovies}
            visibleMovies={visibleMovies}
            movies={movies}
            shortFilm={shortFilm}
          />} />
          <Route path="saved-movies" element={<MoviesCardList
            filteredMovies={filteredMovies}
            visibleMovies={visibleMovies}
            movies={movies}
            shortFilm={shortFilm}
          />} />
        </Route>

        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/signup"
          element={<Register handleRegister={handleRegister} registeredError={registeredError} />}
        />
        <Route path="/error" element={<Error />} />
      </Routes>
      <Navigation isOpen={isMenuOpen} closeMenu={closeMenu} />
    </div>
  );
}

export default App;
