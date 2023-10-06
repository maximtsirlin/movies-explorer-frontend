import React, { Component, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

const MoviesCard = ({ visibleMovies, favorites, filteredMovies = [], addToFavorites, removeFromFavorites }) => {
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false); // State to track if the button has been clicked

  const handleAddToFavorites = (movie) => {
    if (!isClicked) {
      addToFavorites(movie);
      setIsClicked(true); // Set the state to true after the first click
    }
  };

  const handleRemoveFromFavorites = (movie) => {
    removeFromFavorites(movie);
    setIsClicked(false); // Allow the button to be clicked again when removing from favorites
  };

  return (
    <>
      {filteredMovies
        .slice(0, visibleMovies)
        .map((movie) => (
          <div className="movies-card" key={movie._id}>
            {/* ... Other movie card content */}
            {location.pathname === '/movies' && (
              <button
                className={`movies-card__add ${
                  favorites.some((favMovie) => favMovie.id === movie.id)
                    ? 'movies-card__add_active'
                    : ''
                }`}
                onClick={() => handleAddToFavorites(movie)} // Use the new click handler
              >
                Сохранить
              </button>
            )}

            {location.pathname === '/saved-movies' && (
              <button
                className="movies-card__add movies-card__add_delete"
                onClick={() => handleRemoveFromFavorites(movie)} // Use the new click handler
              >
                Удалить из избранного
              </button>
            )}
          </div>
        ))}
    </>
  );
};

export default MoviesCard;
