import React from 'react';

import Router from 'universal/libs/micro-flux-router';

import {updateTitle} from 'universal/actions/application-action-creators';

import HomePage from 'universal/views/universal/pages/home-page';
import TopPage from 'universal/views/universal/pages/top-page';
import StyleguidePage from 'universal/views/universal/pages/styleguide-page';
import NotFoundPage from 'universal/views/universal/pages/not-found-page';

const router = new Router();

router.register('/', {
  action: () => {
    return new Promise(resolve => {
      updateTitle('Handle');
      resolve();
    });
  },
  component: (params, {state}) => {
    if (!state.isAuthenticated) {
      return <HomePage state={state}/>;
    }
    return <TopPage state={state}/>;
  },
});

router.register('/styleguide', {
  action: () => {
    return new Promise(resolve => {
      updateTitle('Styleguide | Handle');
      resolve();
    });
  },
  component: (params, {state}) => {
    return <StyleguidePage state={state}/>;
  },
});

router.register({
  action: () => {
    return new Promise(resolve => {
      updateTitle('Not Found | Handle');
      resolve();
    });
  },
  component: () => {
    return <NotFoundPage/>;
  },
});

export function getComponent(path, data) {
  return router.getComponent(path, data);
}

export function dispatchAction(path) {
  return router.dispatchAction(path);
}

export default router;
