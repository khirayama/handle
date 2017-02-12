import React from 'react';
import ReactDOM from 'react-dom/server';

import i18n from 'libs/micro-i18n';
import {Router, Connector} from 'spectrometer';
import {Store} from '@khirayama/circuit';

import routes from 'config/routes';

import actionTypes from 'constants/action-types';

import {getUI} from 'helpers';

import reducer from 'reducers';

import Task from 'repositories/task';
import Label from 'repositories/label';

const PAGE_TRANSITION_TIME = 600;

function template(head, state, content) {
  return (`
    <!DOCTYPE html>
    <html lang="${state.lang}">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>${head.title}</title>

        <!-- standalone for android-->
        <link rel="manifest" href="/manifest.json">
        <!-- standalone for ios-->
        <meta name="apple-mobile-web-app-capable" content="yes">

        <link rel="stylesheet" href="/index.css">
        <script src="/bundle.js" defer></script>
      </head>
      <body>
        <section class="application ${state.ui}">${content}</section>
      </body>
      <script>var state = ${JSON.stringify(state)}</script>
    </html>
  `);
}

export function applicationHandler(req, res) {
  i18n.setLocale(req.getLocale());

  const pathname = req.path;

  if (!req.isAuthenticated() && pathname !== '/') {
    res.redirect('/');
    return;
  }

  const initialState = {
    lang: req.getLocale(),
    ui: getUI(req.useragent),
    dashboardTabIndex: 0,
    selectedTaskId: null,
    selectedLabelId: null,
    tasks: [],
    labels: [],
  };

  if (req.isAuthenticated()) {
    initialState.profile = {
      username: req.user.username,
      imageUrl: req.user.imageUrl,
    };
  }

  // Can't use createStore. circuit store is singleton.
  const store = new Store(initialState, reducer);

  const router = new Router(routes);

  if (req.isAuthenticated()) {
    const {data} = router.getOptions(pathname);
    const config = {
      headers: {cookie: ''},
    };
    Object.keys(req.cookies).forEach(cookieKey => {
      config.headers.cookie += (cookieKey + '=' + req.cookies[cookieKey] + ';');
    });

    Task.fetch(config).then(tasks => {
      Label.fetch(config).then(labels => {
        store.dispatch({
          type: actionTypes.SET_INITIAL_VALUE,
          tasks,
          labels,
        });
        router.initialize(pathname, Object.assign({}, data, {
          dispatch: store.dispatch.bind(store),
          query: req.query,
        })).then(() => {
          const state = store.getState();

          const head = router.getHead(req.path);
          const content = ReactDOM.renderToString(
            <Connector
              router={router}
              path={req.path}
              store={store}

              transitionName="page-transition"
              transitionEnterTimeout={PAGE_TRANSITION_TIME}
              transitionLeaveTimeout={PAGE_TRANSITION_TIME}
              />
          );

          res.send(template(head, state, content));
        }).catch(error => console.log(error));
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  } else {
    const {data} = router.getOptions(pathname);
    router.initialize(pathname, Object.assign({}, data, {
      dispatch: store.dispatch.bind(store),
      query: req.query,
    })).then(() => {
      const state = store.getState();

      const head = router.getHead(req.path);
      const content = ReactDOM.renderToString(
        <Connector
          router={router}
          path={req.path}
          store={store}

          transitionName="page-transition"
          transitionEnterTimeout={PAGE_TRANSITION_TIME}
          transitionLeaveTimeout={PAGE_TRANSITION_TIME}
          />
      );

      res.send(template(head, state, content));
    }).catch(error => console.log(error));
  }
}
