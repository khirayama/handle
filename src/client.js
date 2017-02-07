import React from 'react';
import ReactDOM from 'react-dom';

import i18n from 'libs/micro-i18n';
import {Router, Connector} from 'spectrometer';
import {createStore} from '@khirayama/circuit';

import routes from 'config/routes';

import reducer from 'reducers';

import actionTypes from 'constants/action-types';

import Task from 'repositories/task';
import Label from 'repositories/label';

const PAGE_TRANSITION_TIME = 600;

function polling(dispatch) {
  setInterval(() => {
    const result = document.hasFocus();
    if (result) {
      Task.fetch().then(tasks => {
        Label.fetch().then(labels => {
          dispatch({
            type: actionTypes.SET_INITIAL_VALUE,
            tasks,
            labels,
          });
        });
      });
    }
  }, 10000);
}

window.addEventListener('contextmenu', event => {
  event.preventDefault();
});

window.addEventListener('DOMContentLoaded', () => {
  i18n.setLocale(window.state.lang);

  const store = createStore(window.state, reducer);

  const router = new Router(routes);

  polling(store.dispatch.bind(store));

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
