import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import './App.css';
import Header from '../Header/Header';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error';
import Navigation from '../Navigation/Navigation';
// import Footer from '../Footer/Footer'; // Import the Footer component

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className='page'>
      <Header openMenu={openMenu} />
      <Routes>
        <Route path="/" element={<Main />} /> 
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path='/error' element={<Error />} />
      </Routes>
      <Navigation isOpen={isMenuOpen} closeMenu={closeMenu} />
    </div>
  );
}

export default App;
