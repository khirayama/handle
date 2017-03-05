import actionTypes from 'constants/action-types';

export function updateSelectedLabelId(dispatch, labelId) {
  dispatch({
    type: actionTypes.UPDATE_SELECTED_LABEL_ID,
    selectedLabelId: labelId,
  });
}
