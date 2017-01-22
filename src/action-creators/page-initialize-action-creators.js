import actionTypes from 'constants/action-types';

import Task from 'repositories/task';
import Label from 'repositories/label';

export function initializeHomePage(params, {dispatch}) {
  return new Promise(resolve => {
    dispatch({type: actionTypes.INITIALIZE_HOME_PAGE});
    resolve();
  });
}

export function initializeDashboardPage(params, {dispatch, config}) {
  return new Promise(resolve => {
    Task.fetch(config).then(tasks => {
      Label.fetch(config).then(labels => {
        dispatch({
          type: actionTypes.INITIALIZE_DASHBOARD_PAGE,
          tasks,
          labels,
        });
        resolve();
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  });
}

export function initializeLabelsPage(params, {dispatch, config}) {
  return new Promise(resolve => {
    Label.fetch(config).then(labels => {
      dispatch({
        type: actionTypes.INITIALIZE_LABELS_PAGE,
        labels,
      });
      resolve();
    }).catch(error => console.log(error));
  });
}
