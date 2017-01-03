import actionTypes from 'constants/action-types';

import Task from 'repositories/task';
import Label from 'repositories/label';

export function initializeHomePage(params, {dispatch}) {
  return new Promise(resolve => {
    dispatch({type: actionTypes.INITIALIZE_HOME_PAGE});
    resolve();
  });
}

export function initializeDashboardPage(params, {dispatch}) {
  return new Promise(resolve => {
    Task.fetch().then((tasks) => {
      Label.fetch().then((labels) => {
        dispatch({
          type: actionTypes.INITIALIZE_DASHBOARD_PAGE,
          tasks,
          labels,
        });
        resolve();
      });
    });
  });
}
