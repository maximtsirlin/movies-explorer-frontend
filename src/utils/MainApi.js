import {ERROR, LOCAL_STORAGE_KEYS} from "./constants";

class Api {
	constructor({baseUrl, headers}) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	getInfo(jwt) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
		}).then((res) => this._addResult(res));
	}

	setInfo(name, email, jwt) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			body: JSON.stringify({
				name,
				email,
			}),
		}).then((res) => this._addResult(res));
	}

	register(name, email, password) {
		return fetch(`${this._baseUrl}/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		}).then((res) => this._addResult(res))
			.catch(() => {
				throw new Error(ERROR.REGISTER);
			});
	}

	login(email, password) {
		return fetch(`${this._baseUrl}/signin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({email, password}),
		}).then((res) => this._addResult(res));
	}

	logout() {
		return fetch(`${this._baseUrl}/signout`, {
			method: "POST",
			headers: this._headers,
		}).then((res) => this._addResult(res));
	}

	getSavedMovies(jwt) {
		return fetch(`${this._baseUrl}/movies`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
		}).then((res) => this._addResult(res));
	}

	postMovie(movie, jwt) {
		return fetch(`${this._baseUrl}/movies`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			body: JSON.stringify({
				country: movie.country,
				director: movie.director,
				duration: movie.duration,
				year: movie.year,
				description: movie.description,
				image: `https://api.nomoreparties.co${movie.image.url}`,
				trailerLink: movie.trailerLink,
				movieId: movie.movieId.toString(),
				nameRU: movie.nameRU,
				nameEN: movie.nameEN,
				thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
			}),
		}).then((res) => this._addResult(res));
	}

	removeMovie(movieId, jwt) {
		return fetch(`${this._baseUrl}/movies/${movieId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
		}).then((res) => this._addResult(res));
	}

	_addResult(res) {
		if (res.ok) {
			return res.json();
		}
		return res.text().then(text => {
			throw new Error(text.match(/"message":"(.+)"/)[1])
		})
	}
}

const mainApi = new Api({
	//baseUrl: "http://localhost:8080",
	baseUrl: "https://api.deploy-diploma.nomoreparties.co",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.JWT)}`,
	},
});

export default mainApi;
