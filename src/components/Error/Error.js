import React from 'react';

function Error() {
  const goBack = () => {
    window.history.back();
  }

  return (
    <main className='error'>
      <h2 className='error__title'>404</h2>
      <p className='error__text'>Страница не найдена</p>
      <button className='error__link' onClick={goBack}>Назад</button>
    </main>
  )
}

export default Error;
