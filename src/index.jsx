import React from 'react';
import ReactDOM from 'react-dom';
import MainRoute from '@pages/Routers';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <MainRoute />
  </Router>,
  document.querySelector('.root')
);
