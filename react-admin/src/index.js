import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './global/App';
import Login from './auth/login2';
//import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);


//reportWebVitals();
