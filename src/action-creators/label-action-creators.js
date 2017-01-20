import actionTypes from 'constants/action-types';

export function createLabel(dispatch, name) {
  dispatch({
    type: actionTypes.CREATE_LABEL,
    label: {name},
  });
}

export function updateLabel(dispatch, labelId, name) {
  dispatch({
    type: actionTypes.UPDATE_LABEL,
    label: {
      id: labelId,
      name,
    },
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
  dispatch({
    type: actionTypes.DELETE_LABEL,
    label: {id: labelId},
  });
}

export function sortLabels(dispatch, labelId, to) {
  dispatch({
    type: actionTypes.SORT_LABELS,
    label: {id: labelId},
    to,
  });
}
