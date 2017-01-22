import React from 'react';
import ReactDOM from 'react-dom/server';

import i18n from 'libs/micro-i18n';
import {Router, Connector} from 'spectrometer';
import {createStore, getState, clearStore} from '@khirayama/circuit';

import routes from 'config/routes';

import {getUI} from 'helpers';

import reducer from 'reducers';

import {User} from '../../models';

const PAGE_TRANSITION_TIME = 600;

export function applicationHandler(req, res) {
  i18n.setLocale(req.getLocale());

  const pathname = req.path;

  const initialState = {
    lang: req.getLocale(),
    ui: getUI(req.useragent),
    tasks: [],
    labels: [],
  };

  clearStore();
  createStore(initialState, reducer);

  const router = new Router(routes);

  const {data} = router.getOptions(pathname);

  let serializedCookies = '';
  Object.keys(req.cookies).forEach(cookieKey => {
    serializedCookies += (cookieKey + '=' + req.cookies[cookieKey] + ';');
  });
  data.config = {
    headers: {'cookie': serializedCookies}
  };

  router.initialize(pathname, data).then(() => {
    const state = getState();
    const head = router.getHead(req.path);
    const content = ReactDOM.renderToString(
      <Connector
        router={router}
        path={req.path}

        transitionName="page-transition"
        transitionEnterTimeout={PAGE_TRANSITION_TIME}
        transitionLeaveTimeout={PAGE_TRANSITION_TIME}
        />
    );

    res.send(`
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
  }).catch(error => console.log(error));
}
