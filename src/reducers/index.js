import actionTypes from 'constants/action-types';

export default function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_INITIAL_VALUE: {
      state.tasks = action.tasks;
      state.labels = action.labels;
      state.profile = action.profile;
      break;
    }

    case actionTypes.INITIALIZE_DASHBOARD_PAGE: {
      state.dashboardTabIndex = action.dashboardTabIndex;
      state.selectedTaskId = null;
      state.selectedLabelId = null;
      break;
    }

    case actionTypes.INITIALIZE_TASK_PAGE: {
      state.selectedTaskId = action.selectedTaskId;
      state.selectedLabelId = action.selectedLabelId;
      break;
    }

    case actionTypes.INITIALIZE_LABELS_PAGE: {
      state.selectedTaskId = null;
      state.selectedLabelId = null;
      break;
    }

    case actionTypes.INITIALIZE_LABEL_PAGE: {
      state.selectedLabelId = action.selectedLabelId;
      break;
    }

    // task
    case actionTypes.CREATE_TASK: {
      state.tasks.push(Object.assign({}, action.task));
      break;
    }
    case actionTypes.UPDATE_TASKS: {
      state.tasks = action.tasks;
      break;
    }
    case actionTypes.UPDATE_TASK: {
      state.tasks = state.tasks.map(task => {
        if (task.id === action.task.id) {
          return Object.assign({}, task, action.task);
        }
        return task;
      });
      break;
    }
    case actionTypes.DELETE_TASK: {
      state.tasks = action.tasks;
      break;
    }
    case actionTypes.SORT_TASKS: {
      state.tasks = action.tasks;
      break;
    }

    // labels
    case actionTypes.CREATE_LABEL: {
      state.labels.push(Object.assign({}, action.label));
      break;
    }
    case actionTypes.UPDATE_LABEL: {
      state.labels = state.labels.map(label => {
        if (label.id === action.label.id) {
          return Object.assign({}, label, action.label);
        }
        return label;
      });
      break;
    }
    case actionTypes.DELETE_LABEL: {
      state.labels = action.labels;
      break;
    }
    case actionTypes.SORT_LABELS: {
      state.labels = action.labels;
      break;
    }

    default: {
      break;
    }
  }
  return state;
}
