import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <li className='portfolio__item'>
            <a className='portfolio__link' href='https://maximtsirlin.github.io/how-to-learn/'>Статичный сайт</a>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link' href='https://maximtsirlin.github.io/russian-travel/'>Адаптивный сайт</a>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link' href='https://github.com/maximtsirlin/react-mesto-api-full-gha'>Одностраничное приложение</a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;