import actionTypes from 'constants/action-types';

export default function reducer(state, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE_DASHBOARD_PAGE:
      state.tasks = action.tasks;
      state.labels = action.labels;
      break;
    case actionTypes.UPDATE_TASK:
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.task.id) {
          return Object.assign({}, task, action.task);
        }
        return task;
      });
      break;
     case actionTypes.DELETE_TASK:
      state.tasks = state.tasks.filter((task) => {
        if (task.id !== action.task.id) {
          return true;
        }
      });
      break;
    default:
      break;
  }
  return state;
}
