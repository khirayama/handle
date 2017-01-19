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
      const targetTask = find(state.tasks, action.task.id);
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
      const targetTask = find(state.tasks, action.task.id);
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

    // labels
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
      const targetLabel = find(state.labels, action.label.id);
      state.labels = state.labels.filter(label => {
        return (label.id !== action.label.id);
      }).map(label => {
        if (label.order > targetLabel.order) {
          return Object.assign({}, label, {order: label.order - 1});
        }
        return label;
      });
      break;
    }
    case actionTypes.SORT_LABELS: {
      const targetLabel = find(state.labels, action.label.id);
      const labels = state.labels.sort((labelA, labelB) => {
        return (labelA.order > labelB.order) ? 1 : -1;
      });
      const from = targetLabel.order;
      const to = action.to;

      if (from > to) {
        for (let index = to; index < from; index++) {
          const label_ = labels[index];
          label_.order += 1;
        }
        labels[from].order = to;
      } else if (from < to) {
        for (let index = from + 1; index <= to; index++) {
          const label_ = labels[index];
          label_.order -= 1;
        }
        labels[from].order = to;
      }
      state.labels = state.labels.map(label => {
        for (let index = 0; index < labels.length; index++) {
          if (labels[index].id === label.id) {
            return labels[index];
          }
        }
        return label;
      });
      break;
    }

    default: {
      break;
    }
  }
  return state;
}
