<<<<<<< HEAD
import { Link, Route, Routes } from 'react-router-dom';
import './Header.css';


function Header(props) {
  return (
    <Routes>
      <Route path='/' element={
        <header className='header'>
          <nav className='header__container header__container_main'>
          <Link className='header__logo' to='/'></Link>
            <ul className='header__auth'>
              <Link className='header__signup' to='/signup'>Регистрация</Link>
              <Link className='header__signin' to='/signin'>Войти</Link>
            </ul>
          </nav>
        </header>
      } />
      {['/movies', '/saved-movies', '/profile',].map(path =>
        <Route path={path} key={path} element={
          <header className='header'>
            <nav className='header__container'>
            <Link className='header__logo' to='/'></Link>
              <ul className='header__links'>
                <Link className='header__link header__link_active' to='/movies'>Фильмы</Link>
                <Link className='header__link' to='/saved-movies'>Сохранённые фильмы</Link>
              </ul>
              <Link className='header__account' to='/profile'>
                <span>Аккаунт</span>
                <div className='header__icon' />
              </Link>
              <button 
              className='header__menu' 
              type='button'
              onClick={props.openMenu} />
            </nav>
          </header>
        } />
      )}
    </Routes>
  )
}

export default Header;
=======
import {Link} from 'react-router-dom';
import './Header.css';
import {useCurrentUser} from '../../utils/UseCurrentUserContext';
import {useLocation} from 'react-router-dom';

function Header(props) {
	const {currentUser} = useCurrentUser();
	const location = useLocation();

	if (location.pathname === '/signin' || location.pathname === '/signup') {
		return null
	}
	if (location.pathname !== '/' && location.pathname !== '/movies' && location.pathname !== '/saved-movies' && location.pathname !== '/profile') {
		return null
	}

	if (currentUser) {
		return (
			<header className='header'>
				<nav className='header__container'>
					<Link className='header__logo' to='/'></Link>
					<ul className='header__links'>
						<Link className='header__link header__link_active' to='/movies'>Фильмы</Link>
						<Link className='header__link' to='/saved-movies'>Сохранённые фильмы</Link>
					</ul>
					<Link className='header__account' to='/profile'>
						<span>Аккаунт</span>
						<div className='header__icon'/>
					</Link>
					<button
						className='header__menu'
						type='button'
						onClick={props.openMenu}/>
				</nav>
			</header>
		)
	}

	return (
		<header className='header'>
			<nav className='header__container header__container_main'>
				<Link className='header__logo' to='/'></Link>
				<ul className='header__auth'>
					<Link className='header__signup' to='/signup'>Регистрация</Link>
					<Link className='header__signin' to='/signin'>Войти</Link>
				</ul>
			</nav>
		</header>
	)
}

export default Header;
>>>>>>> level-3
