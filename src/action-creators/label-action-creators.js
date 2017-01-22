import actionTypes from 'constants/action-types';
import {getState} from '@khirayama/circuit';

import Label from 'repositories/label';

export function createLabel(dispatch, name) {
  const state = getState();

  Label.create({
    name,
    priority: state.labels.length,
  }).then(label => {
    dispatch({
      type: actionTypes.CREATE_LABEL,
      label,
    });
  });
}

export function updateLabel(dispatch, labelId, name) {
  Label.update({
    id: labelId,
    name,
  }).then(label => {
    dispatch({
      type: actionTypes.UPDATE_LABEL,
      label,
    });
  });
}

export function unvisibledLabel(dispatch, labelId) {
  dispatch({
    type: actionTypes.UPDATE_LABEL,
    label: {
      id: labelId,
      visibled: false,
    },
  });
}

export function visibledLabel(dispatch, labelId) {
  dispatch({
    type: actionTypes.UPDATE_LABEL,
    label: {
      id: labelId,
      visibled: true,
    },
  });
}

export function deleteLabel(dispatch, labelId) {
  Label.delete(labelId).then(label => {
    dispatch({
      type: actionTypes.DELETE_LABEL,
      label,
    });
  });
}

export function sortLabels(dispatch, labelId, to) {
  dispatch({
    type: actionTypes.SORT_LABELS,
    label: {id: labelId},
    to,
  });
}
