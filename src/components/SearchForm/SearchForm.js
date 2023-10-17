import React, {useEffect, useState} from 'react';
import './SearchForm.css';

function SearchForm({initValues, setSearchQuery, setShortFilm}) {
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		setInputValue(initValues.searchQuery);
	}, [initValues]);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSearch = () => {
		setSearchQuery(inputValue);
	};

	const handleShortFilmChange = (event) => {
		setSearchQuery(inputValue);
		setShortFilm(event.target.checked);
	  };

	return (
		<section className='search'>
			<div className='search__form'>
				<div className='search__search'>
					<input
						className='search__input'
						placeholder='Фильм'
						value={inputValue}
						onChange={handleInputChange}
					/>
					<button
						className='search__button'
						type='submit'
						onClick={handleSearch}
					>
						Поиск
					</button>
				</div>
				<label className='search__label'>
					Короткометражки
					<input
						className='search__invisible'
						type='checkbox'
						name='short-films'
						id='short-films'
						checked={initValues.shortFilm}
						onChange={handleShortFilmChange}
					/>
					<span className='search__visible'></span>
				</label>
			</div>
		</section>
	);
}

export default SearchForm;
