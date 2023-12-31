<<<<<<< HEAD

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import { CurrentUserProvider } from './utils/CurrentUserContext';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </BrowserRouter>

);


reportWebVitals();
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import {CurrentUserProvider} from './utils/UseCurrentUserContext';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<CurrentUserProvider>
			<App/>
		</CurrentUserProvider>
	</BrowserRouter>
);


reportWebVitals();
>>>>>>> level-3
