import React, {useState, useEffect} from 'react';
import {Route, Routes, useLocation, Navigate} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Pages/Movies/Movies';
import Profile from '../Pages/Profile/Profile';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Error from '../Error/Error';
import Navigation from '../Navigation/Navigation';
import MoviesApi from '../../utils/MoviesApi';
import MoviesCardList from '../Pages/Movies/MoviesCardList/MoviesCardList';
import {useCurrentUser} from '../../utils/UseCurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import MainApi from "../../utils/MainApi";
import {COL, LOCAL_STORAGE_KEYS, SCREEN_SIZE} from "../../utils/constants";

function App() {
	const {currentUser, token} = useCurrentUser();
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
	}, [])


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
		MainApi.removeMovie(removedMovie._id, token).then((result) => {
			const updatedFavorites = favorites.filter((favMovie) => favMovie.movieId !== movie.movieId);
			setFavorites(updatedFavorites)
		})
	}

	function addToFavorites(movie) {
		const exist = favorites.find(el => el.movieId === movie.movieId);

		if (exist) {
			return;
		}
		MainApi.postMovie(movie, token).then((result) => {
			const updatedFavorites = [...favorites, result];
			setFavorites(updatedFavorites)
		});
	}

	useEffect(() => {
		if (location.pathname === '/movies') {
			setMovies(allMovies);
			setShortFilmF(false);
			setSearchQueryF('');
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

		MoviesApi.getMovies().then((result) => {
			result = result.map(el => {
				const tmp = el.id;
				delete el['id'];
				el['movieId'] = tmp;
				return el
			});
			setAllMovies(result);
		});
		mainApi.getSavedMovies(token).then((result) => {
			setFavorites(result)
		})
	}, [token]);

	useEffect(() => {
		if (location?.pathname === '/movies' && movies.length > 0) {
			const result = movies.filter((el) => {
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
		if (location?.pathname !== '/movies' && favorites.length > 0) {
			const result = favorites.filter((el) => {
				const hasQueryResult = searchQueryF ? el.nameRU.toLowerCase().includes(searchQueryF.toLowerCase()) : true;
				console.log(hasQueryResult, shortFilmF, searchQueryF);
				if (shortFilmF) {
					console.log(shortFilmF, el.duration < 40, hasQueryResult && el.duration < 40);
					return hasQueryResult && el.duration < 40;
				} else {
					return hasQueryResult;
				}
			});
			setFilteredMovies(result);
		}
	}, [shortFilmF, searchQueryF, favorites, location.pathname]);

	return (
		<>
			<div className="page">
				<Header openMenu={openMenu}/>
				<Routes>
					<Route path="/" element={<Main/>}/>
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
									<Footer/>
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
									<Footer/>
								</>
							</ProtectedRoute>
						}
					/>

					<Route path="*" element={<Error/>}/>

					<Route path="/profile" element={<Profile/>}/>
					<Route
						path="/signin"
						element={token ? <Navigate to="/"/> : <Login/>}
					/>
					<Route
						path="/signup"
						element={token ? <Navigate to="/"/> : <Register/>}
					/>
				</Routes>
				<Navigation isOpen={isMenuOpen} closeMenu={closeMenu}/>
			</div>
		</>
	);
}

export default App;