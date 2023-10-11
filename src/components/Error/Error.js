import { Link, useLocation } from 'react-router-dom';
import './Error.css';

function Error() {
  const location = useLocation();

  const goBack = () => {
    window.history.back();
  }

  return (
    <main className='error'>
      <h2 className='error__title'>404</h2>
      <p className='error__text'>Page not found</p>
      <button className='error__link' onClick={goBack}>Go back</button>
      <Link className='error__link' to={location.pathname}>Reload</Link>
    </main>
  )
}
