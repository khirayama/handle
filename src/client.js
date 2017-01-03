import React from 'react';
import ReactDOM from 'react-dom';

import i18n from 'libs/micro-i18n';
import {Router, Connector} from 'spectrometer';
import {createStore} from '@khirayama/circuit';

import routes from 'config/routes';

import reducer from 'reducers';

window.addEventListener('DOMContentLoaded', () => {
  i18n.setLocale(window.state.lang);

  createStore(window.state, reducer);

  const router = new Router(routes);

  ReactDOM.render(
    <Connector
      router={router}
      path={location.pathname}
      />,
    document.querySelector('.application')
  );
});
