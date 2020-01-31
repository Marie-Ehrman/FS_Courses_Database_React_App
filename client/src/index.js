import React from 'react';
import ReactDOM from 'react-dom';

// import css
import './styles/global.css';

//import Provider to wrap App in
import { Provider } from './Context';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( //wrap App component in Provider
    
    <Provider>
        <App />
    </Provider>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
