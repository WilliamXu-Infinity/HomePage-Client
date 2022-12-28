import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';
import { io } from 'socket.io-client';

const showMap = {
  Home: true,
  About: true,
  Suggestion: true,
  SnackGame: true,
  Chat: false
}

const defaultPage = "SnackGame"

const socket = showMap.Chat ? io('http://localhost:3001') : null

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <App socket={socket} showMap={showMap} defaultPage={defaultPage}/>
    </BrowserRouter>
  </CookiesProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
