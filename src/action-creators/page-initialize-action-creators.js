import actionTypes from 'constants/action-types';

import Task from 'repositories/task';
import Label from 'repositories/label';

export function initializeHomePage(params, {dispatch}) {
  return new Promise(resolve => {
    dispatch({type: actionTypes.INITIALIZE_HOME_PAGE});
    resolve();
  });
}

export function initializeDashboardPage(params, {dispatch, config, query}) {
  return new Promise(resolve => {
    Task.fetch(config).then(tasks => {
      Label.fetch(config).then(labels => {
        const dashboardTabIndex = (query['tab-index']) ? Number(query['tab-index']) : 0;
        dispatch({
          type: actionTypes.INITIALIZE_DASHBOARD_PAGE,
          dashboardTabIndex,
          tasks,
          labels,
        });
        resolve();
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  });
}

export function initializeTaskPage(params, {dispatch, config, query}) {
  return new Promise(resolve => {
    Task.fetch(config).then(tasks => {
      Label.fetch(config).then(labels => {
        const selectedTaskId = (params.id) ? Number(params.id[0]) : null;
        const selectedLabelId = (query['label-id']) ? Number(query['label-id']) : null;
        dispatch({
          type: actionTypes.INITIALIZE_TASK_PAGE,
          tasks,
          labels,
          selectedTaskId,
          selectedLabelId,
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

export function initializeLabelPage(params, {dispatch, config}) {
  return new Promise(resolve => {
    Label.fetch(config).then(labels => {
      const selectedLabelId = (params.id) ? Number(params.id[0]) : null;
      dispatch({
        type: actionTypes.INITIALIZE_LABEL_PAGE,
        labels,
        selectedLabelId,
      });
      resolve();
    }).catch(error => console.log(error));
  });
}
