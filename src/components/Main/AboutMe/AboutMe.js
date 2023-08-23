import './AboutMe.css';

function AboutMe() {
  return (
    <section className='aboutMe'>
      <h2 className='section__title'>Студент</h2>
      <hr className='section__line' />
      <div className='aboutMe__block'>
        <div className='aboutMe__info'>
          <div className='aboutMe__texts'>
            <h3 className='aboutMe__name'>Максим</h3>
            <p className='aboutMe__about'>Web developer</p>
            <p className='aboutMe__text'>
    тут нужен какой-нибудь текст.
            </p>
          </div>
          <div className='aboutMe__links'>
            <a 
              className='aboutMe__link'
              href='https://maximtsirlin.com/'
              target='_blank'
              rel="noreferrer">Site
            </a>
            <a 
              className='aboutMe__link'
              href='https://github.com/maximtsirlin'
              target='_blank'
              rel="noreferrer">Github
            </a>
          </div>
        </div>
        <div className='aboutMe__image' />
      </div>
    </section>
  )
}

export default AboutMe;