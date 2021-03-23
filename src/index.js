import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import Store from './Helper/Store';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider  } from '@material-ui/core/styles';

const theme = createMuiTheme({})

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {Store}>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
