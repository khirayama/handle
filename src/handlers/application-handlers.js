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

function template(head, state, content) {
  return (`
    <!DOCTYPE html>
    <html lang="${state.lang}">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>${head.title}</title>

        <!-- standalone for android-->
        <meta name="mobile-web-app-capable" content="yes">
        <link rel="icon" sizes="192x192" href="/images/icon-android.png">
        <link rel="manifest" href="/manifest.json">

        <!-- standalone for ios-->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <link rel="apple-touch-icon" sizes="76x76" href="/images/icon-ios.png">

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

function setApplicationInitialState(req) {
  return new Promise(resolve => {
    if (req.isAuthenticated()) {
      const config = {
        headers: {cookie: ''},
      };
      Object.keys(req.cookies).forEach(cookieKey => {
        config.headers.cookie += (cookieKey + '=' + req.cookies[cookieKey] + ';');
      });

      Task.fetch(config).then(tasks => {
        Label.fetch(config).then(labels => {
          const action = {
            type: actionTypes.SET_INITIAL_VALUE,
            tasks,
            labels,
            profile: {
              username: req.user.username,
              imageUrl: req.user.imageUrl,
            },
            selectedLabelId: (req.query['label-id'] === undefined) ? null : Number(req.query['label-id']),
            selectedTaskId: (req.query['task-id'] === undefined) ? null : Number(req.query['task-id']),
          };
          resolve(action);
        }).catch(error => console.log(error));
      }).catch(error => console.log(error));
    } else {
      resolve(null);
    }
  });
}

export function applicationHandler(req, res) {
  const pathname = req.path;

  i18n.setLocale(req.getLocale());

  if (!req.isAuthenticated() && pathname !== '/') {
    res.redirect('/');
    return;
  }

  const initialState = {
    lang: req.getLocale(),
    ui: getUI(req.useragent),
    profile: null,
    selectedTaskId: null,
    selectedLabelId: null,
    tasks: [],
    labels: [],
  };

  // Can't use createStore. circuit store is singleton.
  const store = new Store(initialState, reducer);
  const router = new Router(routes);

  setApplicationInitialState(req).then(action => {
    if (action !== null) {
      store.dispatch(action);
    }

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
          />
      );

      res.send(template(head, state, content));
    });
  }).catch(error => console.log(error));
}
