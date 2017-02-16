import {getState} from '@khirayama/circuit';
import actionTypes from 'constants/action-types';

export function updateDashboardTabIndex(dispatch, dashboardTabIndex) {
  dispatch({
    type: actionTypes.UPDATE_DASHBOARD_TAB_INDEX,
    dashboardTabIndex,
  });
}

export function initializeHomePage(params, {dispatch}) {
  return new Promise(resolve => {
    dispatch({type: actionTypes.INITIALIZE_HOME_PAGE});
    resolve();
  });
}

export function initializeDashboardPage(params, {dispatch, query}) {
  return new Promise(resolve => {
    const state = getState();
    const dashboardTabIndex = (query['tab-index']) ? Number(query['tab-index']) : (state || {}).dashboardTabIndex || 0;
    dispatch({
      type: actionTypes.INITIALIZE_DASHBOARD_PAGE,
      dashboardTabIndex,
    });
    resolve();
  });
}

export function initializeTaskPage(params, {dispatch, query}) {
  return new Promise(resolve => {
    const selectedTaskId = (params.id) ? Number(params.id[0]) : null;
    const selectedLabelId = (query['label-id']) ? Number(query['label-id']) : null;
    dispatch({
      type: actionTypes.INITIALIZE_TASK_PAGE,
      selectedTaskId,
      selectedLabelId,
    });
    resolve();
  });
}

export function initializeLabelsPage(params, {dispatch}) {
  return new Promise(resolve => {
    dispatch({
      type: actionTypes.INITIALIZE_LABELS_PAGE,
    });
    resolve();
  });
}

export function initializeLabelPage(params, {dispatch}) {
  return new Promise(resolve => {
    const selectedLabelId = (params.id) ? Number(params.id[0]) : null;
    dispatch({
      type: actionTypes.INITIALIZE_LABEL_PAGE,
      selectedLabelId,
    });
    resolve();
  });
}
