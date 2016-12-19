import React from 'react';
import {render} from 'react-dom';

import i18n from 'universal/libs/micro-i18n';

import {getComponent} from 'universal/config/routes';

import Store from 'universal/store';

import {changeLocation} from 'universal/actions/application-action-creators';

import ApplicationContainer from 'universal/views/application-container';

window.addEventListener('popstate', () => {
  changeLocation(location.pathname, false);
});

window.addEventListener('DOMContentLoaded', () => {
  i18n.setLocale(window.state.meta.lang);

  const store = new Store(window.state);

  render((
    <ApplicationContainer
      store={store}
      getComponent={getComponent}
      />
  ), document.querySelector('.application'));
});
