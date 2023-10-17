import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import MainApi from "../utils/MainApi";
import { cleanStorage } from "../utils/helpers";

export default function useLogin() {
	const [error, setError] = useState('');
	const [token, setToken] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);
	const navigate = useNavigate();

	const login = async (email, password) => {
		try {
			const resp = await MainApi.login(email, password);
			if (!resp.token) {
				throw new Error('No token received');
			}
			cleanStorage();
			localStorage.jwt = resp.token;
			setToken(resp.token);
		} catch (e) {
			console.error(e);
			setError(e.message);
		}
	};

	useEffect(() => {
		if (!localStorage.jwt) {
			return;
		}
		MainApi.getInfo(localStorage.jwt)
			.then((userInfo) => {
				if (userInfo) {
					setCurrentUser(userInfo.data);
				}
			})
			.catch((err) => {
				console.error(err);
			});
		setToken(localStorage.jwt);
		navigate("/movies");
	}, []);

	return {
		currentUser,
		login,
		error,
		loggedIn: !!token,
	};
}
