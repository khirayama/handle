import actionTypes from 'constants/action-types';

export default function reducer(state, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE_DASHBOARD_PAGE:
      state.tasks = action.tasks;
      state.labels = action.labels;
      break;
    default:
      break;
  }
  return state;
}
