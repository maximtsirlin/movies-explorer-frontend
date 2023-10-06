import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { useCurrentUser } from '../../utils/CurrentUserContext';
import MainApi from '../../utils/MainApi';




function Profile() {
  const { currentUser, logout, token } = useCurrentUser();
  const [name, setName] = useState(currentUser?.name);
  const [email, setEmail] = useState(currentUser?.email);

  async function saveInfo(e) {
    e.preventDefault()
    await MainApi.setInfo(name, email, token)
  }

  return (
    <main className='profile'>
      <h1 className='profile__title'>Привет, {currentUser?.name}!</h1>
      <form
        className='profile__form'
        onSubmit={saveInfo}
      >
        <fieldset className='profile__fieldset'>
          <label className='profile__label' htmlFor='name'>
            Имя
          </label>
          <input
            className='profile__input'
            type='text'
            placeholder='name'
            id='name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </fieldset>
        <fieldset className='profile__fieldset'>
          <label className='profile__label' htmlFor='email'>
            E-mail
          </label>
          <input
            className='profile__input'
            type='email'
            placeholder='email'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </fieldset>
        <div className='profile__links'>
          <button className='profile__btn-edit' type='submit'>
            Редактировать
          </button>
          <button onClick={logout} className='profile__btn-logout'>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}

export default Profile;