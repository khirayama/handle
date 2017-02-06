import React from 'react';
import ReactDOM from 'react-dom';

import i18n from 'libs/micro-i18n';
import {Router, Connector} from 'spectrometer';
import {createStore} from '@khirayama/circuit';

import routes from 'config/routes';

import reducer from 'reducers';

const PAGE_TRANSITION_TIME = 600;

window.addEventListener('contextmenu', event => {
  event.preventDefault();
});

window.addEventListener('scroll', event => {
  document.querySelector('body').scrollTop = 0;
});

window.addEventListener('DOMContentLoaded', () => {
  i18n.setLocale(window.state.lang);

  const store = createStore(window.state, reducer);

  const router = new Router(routes);

  ReactDOM.render(
    <Connector
      router={router}
      path={location.pathname}
      firstRendering={false}
      store={store}

      transitionName="page-transition"
      transitionEnterTimeout={PAGE_TRANSITION_TIME}
      transitionLeaveTimeout={PAGE_TRANSITION_TIME}
      />,
    document.querySelector('.application')
  );
});
