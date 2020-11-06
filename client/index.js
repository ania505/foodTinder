//entry point for client js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/Routes';
import '../public/style.css';

// ReactDOM.render(
//   <div>The program is born :)</div>,
//   document.getElementById('app')
// );

ReactDOM.render(
    <Provider store={store}>
      {/* rest of your app goes here! */}
      <Routes />
      {/* create routes file that organizes all 
      other components and import it into here */}
    </Provider>,
    document.getElementById('app')
);