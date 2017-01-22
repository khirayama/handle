import actionTypes from 'constants/action-types';

function find(items, id) {
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (item.id === id) {
      return item;
    }
  }
  return null;
}

export default function reducer(state, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE_DASHBOARD_PAGE: {
      state.tasks = (state.tasks.length) ? state.tasks : action.tasks;
      state.labels = (state.labels.length) ? state.labels : action.labels;
      break;
    }

    case actionTypes.INITIALIZE_LABELS_PAGE: {
      state.labels = (state.labels.length) ? state.labels : action.labels;
      break;
    }

    // task
    case actionTypes.CREATE_TASK: {
      const tasks = state.tasks.filter(task => {
        return (task.labelId === action.task.labelId);
      }).sort((taskA, taskB) => {
        return (taskA.priority > taskB.priority) ? 1 : -1;
      });
      state.tasks.push(Object.assign({}, {
        id: (new Date()).getTime(),
        priority: tasks.length,
        completed: false,
        createdAt: new Date(),
        updateAt: new Date(),
      }, action.task));
      break;
    }
    case actionTypes.UPDATE_TASK: {
      const targetTask = find(state.tasks, action.task.id);
      if (action.task.labelId && targetTask.labelId !== action.task.labelId) {
        const priority = state.tasks.filter(task => {
          return (action.task.labelId === task.labelId);
        }).length;
        state.tasks = state.tasks.map(task => {
          if (task.id === action.task.id) {
            return Object.assign({}, task, action.task, {priority});
          } else if (task.labelId === targetTask.labelId) {
            if (task.priority > targetTask.priority) {
              return Object.assign({}, task, {priority: task.priority - 1});
            }
          }
          return task;
        });
      } else {
        state.tasks = state.tasks.map(task => {
          if (task.id === action.task.id) {
            return Object.assign({}, task, action.task);
          }
          return task;
        });
      }
      break;
    }
    case actionTypes.DELETE_TASK: {
      const targetTask = find(state.tasks, action.task.id);
      state.tasks = state.tasks.filter(task => {
        return (task.id !== action.task.id);
      }).map(task => {
        if (task.labelId === targetTask.labelId) {
          if (task.priority > targetTask.priority) {
            return Object.assign({}, task, {priority: task.priority - 1});
          }
        }
        return task;
      });
      break;
    }
    case actionTypes.SORT_TASKS: {
      const targetTask = find(state.tasks, action.task.id);
      const tasks = state.tasks.filter(task => {
        return (task.labelId === targetTask.labelId);
      }).sort((taskA, taskB) => {
        return (taskA.priority > taskB.priority) ? 1 : -1;
      });
      const from = targetTask.priority;
      const to = action.to;

      if (from > to) {
        for (let index = to; index < from; index++) {
          const task_ = tasks[index];
          task_.priority += 1;
        }
        tasks[from].priority = to;
      } else if (from < to) {
        for (let index = from + 1; index <= to; index++) {
          const task_ = tasks[index];
          task_.priority -= 1;
        }
        tasks[from].priority = to;
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
