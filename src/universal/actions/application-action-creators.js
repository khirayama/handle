import {dispatch} from 'universal/libs/micro-dispatcher';
import types from 'universal/constants/action-types';
import {getUI} from 'universal/helpers';

import router from 'universal/router';

export function updateTitle(title) {
  dispatch({
    type: types.UPDATE_TITLE,
    title,
  });
}

export function startApplication(pathname, useragent, locale, isAuthenticated) {
  router.dispatchAction(pathname).then(() => {
    dispatch({
      type: types.START_APP,
      ui: getUI(useragent),
      pathname,
      locale,
      isAuthenticated,
    });
  });
}

export function changeLocation(pathname) {
  router.dispatchAction(pathname).then(() => {
    dispatch({
      type: types.CHANGE_LOCATION,
      pathname,
    });
  });
}
