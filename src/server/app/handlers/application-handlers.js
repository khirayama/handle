import React from 'react';
import {renderToString} from 'react-dom/server';

import i18n from 'universal/libs/micro-i18n';
import {unsubscribeAll} from 'universal/libs/micro-dispatcher';

import {getComponent} from 'universal/config/routes';

import Store from 'universal/store';

import {startApplication} from 'universal/actions/application-action-creators';

import Connector from 'universal/views/connector';

function layout(content, state) {
  return `
    <!DOCTYPE html>
    <html lang="${state.meta.lang}">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>${state.meta.title}</title>

        <!-- standalone for android-->
        <link rel="manifest" href="manifest.json">
        <!-- standalone for ios-->
        <meta name="apple-mobile-web-app-capable" content="yes">

        <link rel="stylesheet" href="/index.css">
        <script src="/bundle.js" defer></script>
      </head>
      <body>
        <section class="application">${content}</section>
      </body>
      <script>var state = ${JSON.stringify(state)}</script>
    </html>
  `;
}

export function applicationHandler(req, res) {
  i18n.setLocale(req.getLocale());

  unsubscribeAll();

  const store = new Store();
  store.ready(() => {
    const content = renderToString(
      <Connector
        store={store}
        getComponent={getComponent}
        />
    );
    res.send(layout(content, store.getState()));
  });

  startApplication(
    req.path,
    req.useragent,
    req.getLocale(),
    req.isAuthenticated()
  );
}
