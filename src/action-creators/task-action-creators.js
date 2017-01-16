import actionTypes from 'constants/action-types';

export function uncompletedTask(dispatch, taskId) {
  dispatch({
    type: actionTypes.UPDATE_TASK,
    task: {
      id: taskId,
      completed: false,
    },
  });
}

export function completedTask(dispatch, taskId) {
  dispatch({
    type: actionTypes.UPDATE_TASK,
    task: {
      id: taskId,
      completed: true,
    },
  });
}

export function deleteTask(dispatch, taskId) {
  dispatch({
    type: actionTypes.DELETE_TASK,
    task: {id: taskId},
  });
}

export function sortTasks(dispatch, taskId, to) {
  dispatch({
    type: actionTypes.SORT_TASKS,
    task: {id: taskId},
    to,
  });
}
