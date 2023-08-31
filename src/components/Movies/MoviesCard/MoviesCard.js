import './MoviesCard.css';
import firstMovie from'../../../images/1st-mov.jpeg';
import secondMovie from'../../../images/2d-mov.jpeg';
import thirdMovie from'../../../images/3d-mov.jpeg';
import fourthMovie from'../../../images/4th-mov.jpeg';
import fifthMovie from'../../../images/5th-mov.jpeg';
import sixthMovie from'../../../images/6th-mov.jpeg';
import seventhMovie from'../../../images/7th-mo.jpeg';
import { useLocation } from 'react-router-dom';


function MoviesCard() {
  const location = useLocation();

  return (
    <>
    {location.pathname === '/movies' ? 
    <>
      <div className='movies-card'> 
        <div className='movies-card__about'>
          <h2 className='movies-card__title'>33 слова о дизайне</h2>
          <p className='movies-card__duration'>1ч 42м</p>
        </div>
        <img src={firstMovie} alt='33 слова о дизайне' className='movies-card__image' />
        <button class="movies-card__add movies-card__add_active">Сохранить</button>
      </div>
      <div className='movies-card'>
        <div className='movies-card__about'>
          <h2 className='movies-card__title'>Киноальманах «100 лет дизайна»</h2>
          <p className='movies-card__duration'>1ч 42м</p>
        </div>
        <img src={secondMovie} alt='Киноальманах «100 лет дизайна»' className='movies-card__image' />
        <button className="movies-card__add movies-card__add_active">Сохранить</button>
      </div>
      <div className='movies-card'>
        <div className='movies-card__about'>
          <h2 className='movies-card__title'>В погоне за Бенкси</h2>
          <p className='movies-card__duration'>1ч 42м</p>
        </div>
        <img src={thirdMovie} alt='В погоне за Бенкси' className='movies-card__image' />
        <button className="movies-card__add">Сохранить</button>
      </div>
      <div className='movies-card'>
        <div className='movies-card__about'>
          <h2 className='movies-card__title'>Баския: Взрыв реальности</h2>
          <p className='movies-card__duration'>1ч 42м</p>
        </div>
        <img src={fourthMovie} alt='Баския: Взрыв реальности' className='movies-card__image' />
        <button class="movies-card__add">Сохранить</button>
      </div>
      <div className='movies-card'>
        <div className='movies-card__about'>
          <h2 className='movies-card__title'>Бег это свобода</h2>
          <p className='movies-card__duration'>1ч 42м</p>
        </div>
        <img src={fifthMovie} alt='Бег это свобода' className='movies-card__image' />
        <button class="movies-card__add movies-card__add_active">Сохранить</button>
      </div>
      <div className='movies-card'>
        <div className='movies-card__about'>
          <h2 className='movies-card__title'>Книготорговцы</h2>
          <p className='movies-card__duration'>1ч 42м</p>
        </div>
        <img src={sixthMovie} alt='Книготорговцы' className='movies-card__image' />
        <button class="movies-card__add">Сохранить</button>
      </div>
      <div className='movies-card'>
        <div className='movies-card__about'>
          <h2 className='movies-card__title'>Когда я думаю о Германии ночью</h2>
          <p className='movies-card__duration'>1ч 42м</p>
        </div>
        <img src={seventhMovie} alt='Когда я думаю о Германии ночью' className='movies-card__image' />
        <button className="movies-card__add">Сохранить</button>
      </div>
      </>
      : 
        <>
          <div className='movies-card'>
            <div className='movies-card__about'>
              <h2 className='movies-card__title'>33 слова о дизайне</h2>
              <p className='movies-card__duration'>1ч 42м</p>
            </div>
            <img src={firstMovie} alt='33 слова о дизайне' className='movies-card__image' />
            <button class="movies-card__add movies-card__add_delete">Сохранить</button>
          </div>
          <div className='movies-card'>
            <div className='movies-card__about'>
              <h2 className='movies-card__title'>Киноальманах «100 лет дизайна»</h2>
              <p className='movies-card__duration'>1ч 42м</p>
            </div>
            <img src={secondMovie} alt='Киноальманах «100 лет дизайна»' className='movies-card__image' />
            <button className="movies-card__add movies-card__add_delete">Сохранить</button>
          </div>
          <div className='movies-card'>
            <div className='movies-card__about'>
              <h2 className='movies-card__title'>В погоне за Бенкси</h2>
              <p className='movies-card__duration'>1ч 42м</p>
            </div>
            <img src={thirdMovie} alt='В погоне за Бенкси' className='movies-card__image' />
            <button className="movies-card__add movies-card__add_delete">Сохранить</button>
          </div>
        </>
      }
    </>
  )
}

export default MoviesCard;