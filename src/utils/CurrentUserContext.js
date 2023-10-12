import {createContext, useContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import MainApi from '../utils/MainApi';

const CurrentUserContext = createContext();

export function useCurrentUser() {
	return useContext(CurrentUserContext);
}

export function CurrentUserProvider({children}) {
	const [error, setError] = useState('');
	const [token, setToken] = useState(localStorage.getItem('jwt') || null);
	const [currentUser, setCurrentUser] = useState(null);
	const navigate = useNavigate();

	const login = (email, password) => {
		return MainApi.login(email, password)
			.then((resp) => {
				if (!resp.token) {
					return Promise.reject()
				}
				localStorage.setItem('jwt', resp.token); // Сохраняем токен в localStorage
				setToken(resp.token);
			});
	};

	const logout = () => {
		localStorage.removeItem('jwt');
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
		<CurrentUserContext.Provider value={{token, login, logout, currentUser, error}}>
			{children}
		</CurrentUserContext.Provider>
	);
}
