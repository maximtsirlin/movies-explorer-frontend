import { Link, useHistory } from 'react-router-dom';
import './Error.css';

function Error() {
  const history = useHistory(); 

  const goBack = () => {
    history.goBack();
  }

  return (
    <main className='error'>
      <h2 className='error__title'>404</h2>
      <p className='error__text'>Page not found</p>
      <button className='error__link' onClick={goBack}>Go back</button>
    </main>
  )
}

export default Error;
