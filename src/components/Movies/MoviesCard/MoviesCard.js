import React, { Component } from 'react';
import { useLocation } from 'react-router-dom'; //Он импортирует необходимые модули и файлы CSS, включая React, Componentиз React, useLocationиз «react-router-dom» и файл CSS с именем «MoviesCard.css».
import './MoviesCard.css';

class MoviesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      shortFilm: false,
    };
  } 


  // componentDidMount() {
  //   const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  //   this.setState({ favorites: storedFavorites });
  // } 


  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.favorites !== this.state.favorites) {
  //     localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
  //   }
  // } 


  addToFavorites = (movie) => {
    const updatedFavorites = [...this.state.favorites, movie];
    this.setState({ favorites: updatedFavorites });
  }; 

  removeFromFavorites = (movie) => {
    const updatedFavorites = this.state.favorites.filter((favMovie) => favMovie.id !== movie.id);
    this.setState({ favorites: updatedFavorites });
  };

  render() {
    const { visibleMovies, favorites, filteredMovies = [],  } = this.props;
    console.trace('filtredMovies', filteredMovies);
    return (
      <>
        {filteredMovies
          .slice(0, visibleMovies)
          .map((movie) => (
            <div className="movies-card" key={movie._id}>
              <div className="movies-card__about">
                <h2 className="movies-card__title">{movie.nameRU}</h2>
                <p className="movies-card__duration">{movie.duration}</p>
              </div>
              <img
                className="movies-card__image"
                src={'https://api.nomoreparties.co' + movie.image.url}
                alt={movie.nameRU}
              />
              <button
                className={`movies-card__add ${
                  favorites.some((favMovie) => favMovie.id === movie.id)
                    ? 'movies-card__add_active'
                    : ''
                }`}
                onClick={() => this.addToFavorites(movie)}
              >
                Сохранить
              </button>
              {favorites.some((favMovie) => favMovie.id === movie.id) ? (
                <button
                  className="movies-card__add movies-card__add_delete"
                  onClick={() => this.removeFromFavorites(movie)}
                >
                  Удалить из избранного
                </button>
              ) : null}
            </div>
          ))}
      </>
    );
  }
}

export default MoviesCard;
