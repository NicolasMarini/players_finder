import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PlayerContainer from './containers/PlayerContainer';
import configureStore from './configureStore';
import './index.css';
import { Provider } from 'react-redux';


const store = configureStore();

ReactDOM.render(
  <Provider store = { store } >
    <PlayerContainer />
  </Provider>,
    document.getElementById('root')
);
