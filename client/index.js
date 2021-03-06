//entry point for client js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/Routes';
import '../public/style.css';

ReactDOM.render(
  <Routes />,
  document.getElementById('app')
);

// ReactDOM.render(
//     <Provider store={store}>
//       <Routes />
//     </Provider>,
//     document.getElementById('app')
// );