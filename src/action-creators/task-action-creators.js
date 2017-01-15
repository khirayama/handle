import actionTypes from 'constants/action-types';

import Task from 'repositories/task';

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

export function sortTasks(dispatch, labelId, from, to) {
  dispatch({
    type: actionTypes.SORT_TASKS,
    labelId,
    from,
    to,
  });
}
