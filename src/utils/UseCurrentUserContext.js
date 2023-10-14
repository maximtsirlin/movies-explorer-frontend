import {createContext, useContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import MainApi from '../utils/MainApi';
import {ERROR, LOCAL_STORAGE_KEYS} from "./constants";

const UseCurrentUserContext = createContext();

export function useCurrentUser() {
	return useContext(UseCurrentUserContext);
}

export function CurrentUserProvider({children}) {
	const [error, setError] = useState('');
	const [token, setToken] = useState(localStorage.getItem(LOCAL_STORAGE_KEYS.JWT) || null);
	const [currentUser, setCurrentUser] = useState(null);
	const navigate = useNavigate();

	const login = (email, password) => {
		return MainApi.login(email, password)
			.then((resp) => {
				if (!resp.token) {
					return Promise.reject()
				}
				localStorage.setItem(LOCAL_STORAGE_KEYS.JWT, resp.token); // Сохраняем токен в localStorage
				setToken(resp.token);
			})
			.catch(() => {
				throw new Error(ERROR.LOGIN);
			});
	};

	const
		logout = () => {
			localStorage.removeItem(LOCAL_STORAGE_KEYS.JWT);
			localStorage.removeItem(LOCAL_STORAGE_KEYS.SHORT_FILM);
			localStorage.removeItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY);
			localStorage.removeItem(LOCAL_STORAGE_KEYS.SHORT_FILM_F);
			localStorage.removeItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY_F);
			setToken(null);
			setCurrentUser(null);
			navigate('/');
		};

	useEffect(() => {
		if (!token) {
			return;
		}
		console.log('token', token);
		MainApi.getInfo(token)
			.then((userInfo) => {
				console.log('userInfo', userInfo)
				if (userInfo) {
					setCurrentUser(userInfo);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [token]);

	return (
		<UseCurrentUserContext.Provider value={{token, login, logout, currentUser, error}}>
			{children}
		</UseCurrentUserContext.Provider>
	);
}
