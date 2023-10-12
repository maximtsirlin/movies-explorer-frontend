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
import {useCurrentUser} from '../../utils/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import MainApi from "../../utils/MainApi";

function App() {
	const {currentUser, token} = useCurrentUser();
	const [favorites, setFavorites] = useState([]);
	const [allMovies, setAllMovies] = useState([]);
	const [movies, setMovies] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [shortFilm, setShortFilm] = useState(false);
	const [filteredMovies, setFilteredMovies] = useState(allMovies);
	const [visibleMovies, setVisibleMovies] = useState(calculateVisibleMovies());
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const location = useLocation();

	useEffect(() => {
		const shortFilms = localStorage.getItem('shortFilms');
		const searchQuery = localStorage.getItem('searchQuery') || '';
		console.log("searchQuery", searchQuery);
		setSearchQuery(searchQuery === "undefined" ? "" : searchQuery);
		setShortFilm(shortFilms === "true");
	}, [])


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

	const handleShortFilm = (value) => {
		localStorage.setItem('shortFilms', value);
		setShortFilm(value);
	}

	const handleSearchInputFilm = (value) => {
		localStorage.setItem('searchQuery', value);
		setSearchQuery(value);
	}

	function removeFromFavorites(movie) {
		const removedMovie = favorites.find(el => el.movieId === movie.movieId);
		MainApi.removeMovie(removedMovie._id, token).then((result) => {
			const updatedFavorites = favorites.filter((favMovie) => favMovie.movieId !== movie.movieId);
			setFavorites(updatedFavorites)
		})
	}

	function addToFavorites(movie) {
		MainApi.postMovie(movie, token).then((result) => {
			const updatedFavorites = [...favorites, result];
			setFavorites(updatedFavorites)
		});
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
