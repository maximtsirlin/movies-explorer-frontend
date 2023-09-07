import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <li className='portfolio__item'>
            <a className='portfolio__link' href='https://maximtsirlin.github.io/how-to-learn/' target="_blank" rel="noreferrer">
              <div className='portfolio__content'>
                <p>Статичный сайт</p>
                {/* You can add an icon here if needed */}
              </div>
            </a>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link' href='https://maximtsirlin.github.io/russian-travel/' target="_blank" rel="noreferrer">
              <div className='portfolio__content'>
                <p>Адаптивный сайт</p>
                {/* You can add an icon here if needed */}
              </div>
            </a>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link' href='https://github.com/maximtsirlin/react-mesto-api-full-gha' target="_blank" rel="noreferrer">
              <div className='portfolio__content'>
                <p>Одностраничное приложение</p>
                {/* You can add an icon here if needed */}
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;
