import { useNavigation } from "react-router-dom";
import React, { useState } from 'react';
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

function App() {
  const [setMovies] = useState([]);

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

  useEffect(() => {
    MoviesApi.getMovies().then((result) => {
      setMovies(result);
    });
  }, [currentPath]);

  return (
    <div className="page">
      <Header openMenu={openMenu} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<Movies />} />
        {/* <Route path="/movies" element={<Users users={users} />} /> */}
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
