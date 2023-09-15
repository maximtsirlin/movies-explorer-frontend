import './SearchForm.css';

import React, { useState } from 'react';


function SearchForm({ setSearchQuery }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(inputValue);
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
          ></input>
          <button
            className='search__button'
            type='submit'
            onClick={handleSearch}
          >Найти</button>
        </div>
        <label className='search__label'>
          Короткометражки
          <input className='search__invisible'
            type='checkbox'
            name='short-films'
            id='short-films'
            value='short-films'></input>
          <span className='search__visible'></span>
        </label>
      </div>
    </section>
  )
}



export default SearchForm;









