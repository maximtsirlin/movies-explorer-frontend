<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error';
import Navigation from '../Navigation/Navigation';
import MoviesApi from '../../utils/MoviesApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useCurrentUser } from '../../utils/UseCurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import { COL, LOCAL_STORAGE_KEYS, SCREEN_SIZE } from "../../utils/constants";
import Loader from '../Loader/Loader';

function App() {
	const { currentUser, token } = useCurrentUser();
	const [favorites, setFavorites] = useState([]);
	const [allMovies, setAllMovies] = useState([]);
	const [movies, setMovies] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [shortFilm, setShortFilm] = useState(false);
	const [searchQueryF, setSearchQueryF] = useState('');
	const [shortFilmF, setShortFilmF] = useState(false);
	const [filteredMovies, setFilteredMovies] = useState(allMovies);
	const [visibleMovies, setVisibleMovies] = useState(calculateVisibleMovies());
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const location = useLocation();

	useEffect(() => {
		const shortFilms = localStorage.getItem(LOCAL_STORAGE_KEYS.SHORT_FILM);
		const searchQuery = localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY) || '';
		setSearchQuery(searchQuery === "undefined" ? "" : searchQuery);
		setShortFilm(shortFilms === "true");

		const shortFilmsF = localStorage.getItem(LOCAL_STORAGE_KEYS.SHORT_FILM_F);
		const searchQueryF = localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY_F) || '';
		setSearchQueryF(searchQueryF === "undefined" ? "" : searchQueryF);
		setShortFilmF(shortFilmsF === "true");
	}, [token])


	const openMenu = () => {
		setIsMenuOpen(true);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	function calculateVisibleMovies() {
		const screenWidth = window.innerWidth;
		if (screenWidth >= SCREEN_SIZE.DESKTOP) {
			return COL.DESKTOP;
		} else if (screenWidth >= SCREEN_SIZE.TABLE) {
			return COL.TABLE;
		} else if (screenWidth >= SCREEN_SIZE.MOBILE && screenWidth <= SCREEN_SIZE.MOBILE_R) {
			return COL.MOBILE;
		}
		return COL.MOBILE;
	}

	const handleShortFilm = (value) => {
		localStorage.setItem(LOCAL_STORAGE_KEYS.SHORT_FILM, value);
		setShortFilm(value);
	}

	const handleShortFFilm = (value) => {
		localStorage.setItem(LOCAL_STORAGE_KEYS.SHORT_FILM_F, value);
		setShortFilmF(value);
	}

	const handleSearchInputFilm = (value) => {
		localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY, value);
		setSearchQuery(value);
	}

	const handleSearchFInputFilm = (value) => {
		localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY_F, value);
		setSearchQueryF(value);
	}

	function removeFromFavorites(movie) {
		const removedMovie = favorites.find(el => el.movieId === movie.movieId);
		mainApi.removeMovie(removedMovie._id, token).then((result) => {
			const updatedFavorites = favorites.filter((favMovie) => favMovie.movieId !== movie.movieId);
			setFavorites(updatedFavorites)
		})
	}

	function addToFavorites(movie) {
		const exist = favorites.find(el => el.movieId === movie.movieId);

		if (exist) {
			return;
		}
		mainApi.postMovie(movie, token).then((result) => {
			const updatedFavorites = [...favorites, result];
			setFavorites(updatedFavorites)
		});
	}

	useEffect(() => {
		if (location.pathname !== '/saved-movies') {
			setShortFilmF(false);
			setSearchQueryF('');
		}

		if (location.pathname === '/movies') {
			setMovies(allMovies);
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
		if (!token) {
			return;
		}

		setIsLoading(true);
		Promise.all([
			MoviesApi.getMovies().then((result) => {
				result = result.map(el => {
					const tmp = el.id;
					delete el['id'];
					el['movieId'] = tmp;
					return el
				});
				setAllMovies(result);
				return true;
			}),
			mainApi.getSavedMovies(token).then((result) => {
				setFavorites(result);
				return true;
			})
		]).then(() => {
			setIsLoading(false);
		});

	}, [token]);

	useEffect(() => {
		if (location?.pathname === '/movies') {
			const result = movies?.filter((el) => {
				const hasQueryResult = searchQuery ? el.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) : true;
				if (shortFilm) {
					return hasQueryResult && el.duration < 40;
				} else {
					return hasQueryResult;
				}
			});
			setFilteredMovies(result);
		}
	}, [shortFilm, searchQuery, movies, location.pathname]);

	useEffect(() => {
		if (location?.pathname !== '/movies') {
			const result = favorites?.filter((el) => {
				const hasQueryResult = searchQueryF ? el.nameRU.toLowerCase().includes(searchQueryF.toLowerCase()) : true;
				if (shortFilmF) {
					return hasQueryResult && el.duration < 40;
				} else {
					return hasQueryResult;
				}
			});
			setFilteredMovies(result);
		}
	}, [shortFilmF, searchQueryF, favorites, location.pathname]);

	if (isLoading) {
		return <Loader />
	}

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
										initValues={{
											shortFilm,
											searchQuery,
										}}
										setSearchQuery={handleSearchInputFilm}
										setShortFilm={handleShortFilm}
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
										initValues={{
											shortFilm: shortFilmF,
											searchQuery: searchQueryF,
										}}
										setSearchQuery={handleSearchFInputFilm}
										setShortFilm={handleShortFFilm}
									/>
									<MoviesCardList
										filteredMovies={filteredMovies}
										visibleMovies={visibleMovies}
										movies={allMovies}
										shortFilm={shortFilmF}
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
>>>>>>> level-3
