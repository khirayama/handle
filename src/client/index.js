import React from 'react';
import {render} from 'react-dom';

import Store from 'universal/store';

import Connector from 'universal/views/connector';

import i18n from 'universal/locales';
import {changeLocation} from 'universal/actions/application-action-creators';

import {getComponent} from 'universal/router';

window.addEventListener('popstate', () => {
  changeLocation(location.pathname, false);
});

window.addEventListener('DOMContentLoaded', () => {
  i18n.setLocale(window.state.meta.lang);

  const store = new Store(window.state);

  render((
    <Connector
      store={store}
      getComponent={getComponent}
      />
  ), document.querySelector('.application'));
});
