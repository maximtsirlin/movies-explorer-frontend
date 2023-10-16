import {LOCAL_STORAGE_KEYS} from "./constants";

export const cleanStorage = () => {
	localStorage.removeItem(LOCAL_STORAGE_KEYS.SHORT_FILM);
	localStorage.removeItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY);
	localStorage.removeItem(LOCAL_STORAGE_KEYS.SHORT_FILM_F);
	localStorage.removeItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY_F);
};
