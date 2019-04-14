import React from 'react';
import ReactDOM from 'react-dom';
import MainRoute from '@pages/Routers';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '@redux/store';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import '@script/semantic.min';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MainRoute />
    </Router>
  </Provider>,

  document.querySelector('.root')
);
