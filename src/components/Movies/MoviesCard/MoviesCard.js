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
  } //Конструктор компонента инициализирует свое состояние с помощью двух свойств: 
  //favorites, который представляет собой массив, изначально установленный в пустой массив, 
  //и shortFilm, который представляет собой логическое значение, изначально установленное в false

  componentDidMount() {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    this.setState({ favorites: storedFavorites });
  } //Этот метод жизненного цикла используется для получения и загрузки данных из локального 
  //хранилища. Он анализирует элемент «Избранное» из локального хранилища 
  //(если он существует) и устанавливает его в качестве начального значения состояния favorites.


  componentDidUpdate(prevProps, prevState) {
    if (prevState.favorites !== this.state.favorites) {
      localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
    }
  } //Этот метод жизненного цикла отслеживает изменения состояния favorites и обновляет 
  //локальное хранилище новым значением при каждом его изменении. Он используется 
  //localStorage.setItem для хранения обновленного favorites массива в виде строки JSON.


  addToFavorites = (movie) => {
    const updatedFavorites = [...this.state.favorites, movie];
    this.setState({ favorites: updatedFavorites });
  }; //Этот метод используется для добавления фильма в favorites массив в состоянии компонента. 
  //Он создает новый массив с добавленным в него выбранным фильмом и обновляет состояние 
  //с помощью этого нового массива.

  removeFromFavorites = (movie) => {
    const updatedFavorites = this.state.favorites.filter((favMovie) => favMovie.id !== movie.id);
    this.setState({ favorites: updatedFavorites });
  }; //Этот метод используется для удаления фильма из favoritesмассива в состоянии компонента. 
  //Он фильтрует favoritesмассив, чтобы исключить фильм с указанным идентификатором, 
  //и обновляет состояние с помощью отфильтрованного массива.

  render() {
    const { visibleMovies, movies, filteredMovies = [], currentPath } = this.props;
    const { favorites, shortFilm } = this.state;

    return (
      <>
        {filteredMovies
          .filter((movie) => (!shortFilm || parseInt(movie.duration, 10) <= 40))
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
