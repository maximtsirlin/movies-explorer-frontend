import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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

function App() {
  const { token } = useCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="page">
        <Header openMenu={openMenu} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<ProtectedRoute loggedIn={!!token}>
            <Movies />
          </ProtectedRoute>
          } />
          <Route path="/saved-movies" element={<ProtectedRoute loggedIn={!!token}>
            <Movies saved />
          </ProtectedRoute>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Login />} />
          <Route
            path="/signup"
            element={<Register />}
          />
          <Route path="/error" element={<Error />} />
        </Routes>
        <Navigation isOpen={isMenuOpen} closeMenu={closeMenu} />
      </div>
    </>
  );
}

export default App;
