import firstImage from '../../src/images/1st-mov.jpeg';
import secondImage from '../../src/images/2d-mov.jpeg';
import thirdImage from '../../src/images/3d-mov.jpeg';
import fourthImage from '../../src/images/4th-mov.jpeg';
import fifthImage from '../../src/images/5th-mov.jpeg';
import sixthImage from '../../src/images/6th-mov.jpeg';

export const moviesData = [
	{
		title: '33 слова о дизайне',
		duration: '1ч 42м',
		image: firstImage,
		isSaved: true,
	},
	{
		title: 'Киноальманах «100 лет дизайна',
		duration: '1ч 42м',
		image: secondImage,
		isSaved: true,
	},
	{
		title: 'В погоне за Бенкси',
		duration: '1ч 42м',
		image: thirdImage,
		isSaved: true,
	},
	{
		title: 'Бег это свобода',
		duration: '1ч 42м',
		image: fourthImage,
		isSaved: true,
	},
	{
		title: 'Книготорговцы',
		duration: '1ч 42м',
		image: fifthImage,
		isSaved: true,
	},
	{
		title: 'Когда я думаю о Германии ночью',
		duration: '1ч 42м',
		image: sixthImage,
		isSaved: true,
	},
	{
		title: '33 слова о дизайне',
		duration: '1ч 42м',
		image: firstImage,
		isSaved: true,
	},
	{
		title: 'Киноальманах «100 лет дизайна',
		duration: '1ч 42м',
		image: secondImage,
		isSaved: true,
	},
	{
		title: 'В погоне за Бенкси',
		duration: '1ч 42м',
		image: thirdImage,
		isSaved: true,
	},
	{
		title: 'Бег это свобода',
		duration: '1ч 42м',
		image: fourthImage,
		isSaved: true,
	},
	{
		title: 'Книготорговцы',
		duration: '1ч 42м',
		image: fifthImage,
		isSaved: true,
	},
	{
		title: 'Когда я думаю о Германии ночью',
		duration: '1ч 42м',
		image: sixthImage,
		isSaved: true,
	},
];


export const moviesDataSave = [
	{
		title: '33 слова о дизайне',
		duration: '1ч 42м',
		image: firstImage,
		isSaved: true,
	},
	{
		title: 'Киноальманах «100 лет дизайна',
		duration: '1ч 42м',
		image: secondImage,
		isSaved: true,
	},
	{
		title: 'В погоне за Бенкси',
		duration: '1ч 42м',
		image: thirdImage,
		isSaved: true,
	}
];


export const LOCAL_STORAGE_KEYS = {
	JWT: 'jwt',
	SHORT_FILM: 'shortFilms',
	SHORT_FILM_F: 'shortFilms',
	SEARCH_QUERY: 'searchQuery',
	SEARCH_QUERY_F: 'searchQueryF',
};

export const SCREEN_SIZE = {
	DESKTOP: 1280,
	TABLE: 768,
	MOBILE: 320,
	MOBILE_R: 480,
}

export const COL = {
	DESKTOP: 12,
	TABLE: 8,
	MOBILE: 5,
}

export const ERROR = {
	LOGIN: "Неправильный логин или пароль!",
	REGISTER: "Такой пользователь уже существует!",
	EDIT: "Не смогли обновить данные!",
};

export const SUCCESS = {
	EDIT: "Данные успешно обновлены!",
};
