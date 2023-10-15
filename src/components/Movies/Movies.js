import {Outlet} from 'react-router-dom';
import React from 'react';
import SearchForm from '../../common/SearchForm/SearchForm';
import './Movies.css';

function Movies({initValues, setSearchQuery, setShortFilm}) {
	return (
		<main className='movies'>
			<SearchForm
				initValues={initValues}
				setSearchQuery={setSearchQuery}
				setShortFilm={setShortFilm}/>
			<Outlet/>
		</main>
	);
}

export default Movies;
