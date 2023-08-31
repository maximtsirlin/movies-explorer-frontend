import { Link } from 'react-router-dom';
import './Navigation.css';


function Navigation(props) {

    return (
    <div className={props.isOpen ? 'navigation navigation__open' : 'navigation navigation__hidden'}>
            <div className='navigation__container'>
                <button
                    className='navigation__close'
                    type='button'
                    onClick={props.closeMenu} />
                
                <Link className='navigation__link' to='/'>Главная</Link>
                <Link className='navigation__link menu__link_active' to='/movies'>Фильмы</Link>
                <Link className='navigation__link' to='/saved-movies'>Сохранённые фильмы</Link>
                <Link
                    className='navigation__account'
                    to='/profile'
                   >
                    Аккаунт
                    <div className='navigation__icon' />
                </Link>
            </div>
        </div>
    )
}

export default Navigation;