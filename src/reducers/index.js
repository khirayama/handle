import actionTypes from 'constants/action-types';

export function findTask(tasks, id) {
  for (let index = 0; index < tasks.length; index++) {
    const task = tasks[index];
    if (task.id === id) {
      return task;
    }
  }
  return null;
}

export default function reducer(state, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE_DASHBOARD_PAGE: {
      state.tasks = action.tasks;
      state.labels = action.labels;
      break;
    }

      // task
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
      const targetTask = findTask(state.tasks, action.task.id);
      state.tasks = state.tasks.filter(task => {
        return (task.id !== action.task.id);
      }).map(task => {
        if (task.labelId === targetTask.labelId) {
          if (task.order > targetTask.order) {
            return Object.assign({}, task, {order: task.order - 1});
          }
        }
        return task;
      });
      break;
    }
    case actionTypes.SORT_TASKS: {
      const targetTask = findTask(state.tasks, action.task.id);
      const tasks = state.tasks.filter(task => {
        return (task.labelId === targetTask.labelId);
      }).sort((taskA, taskB) => {
        return (taskA.order > taskB.order) ? 1 : -1;
      });
      const from = targetTask.order;
      const to = action.to;

      if (from > to) {
        for (let index = to; index < from; index++) {
          const task_ = tasks[index];
          task_.order += 1;
        }
        tasks[from].order = to;
      } else if (from < to) {
        for (let index = from + 1; index <= to; index++) {
          const task_ = tasks[index];
          task_.order -= 1;
        }
        tasks[from].order = to;
      }
      state.tasks = state.tasks.map(task => {
        for (let index = 0; index < tasks.length; index++) {
          if (tasks[index].id === task.id) {
            return tasks[index];
          }
        }
        return task;
      });
      break;
    }
    default: {
      break;
    }
  }
  return state;
}
