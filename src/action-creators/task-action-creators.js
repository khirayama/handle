import actionTypes from 'constants/action-types';
import {getState} from '@khirayama/circuit';

import Task from 'repositories/task';

function find(items, id) {
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (item.id === id) {
      return item;
    }
  }
  return null;
}

export function createTask(dispatch, content, labelId) {
  const state = getState();
  const tasks = state.tasks.filter(task => {
    return (task.labelId === labelId);
  }).sort((taskA, taskB) => {
    return (taskA.priority > taskB.priority) ? 1 : -1;
  });

  Task.create({
    content,
    labelId,
    priority: tasks.length,
  }).then(task => {
    dispatch({
      type: actionTypes.CREATE_TASK,
      task,
    });
  });
}

export function updateTask(dispatch, taskId, content, labelId) {
  let newTasks = [];
  const state = getState();

  const targetTask = find(state.tasks, taskId);
  if (labelId && targetTask.labelId !== labelId) {
    const priority = state.tasks.filter(task => {
      return (labelId === task.labelId);
    }).length;
    newTasks = state.tasks.map(task => {
      if (task.id === taskId) {
        const newTask = Object.assign({}, task, {labelId, content, priority});
        Task.update(newTask);
        return newTask;
      } else if (task.labelId === targetTask.labelId) {
        if (task.priority > targetTask.priority) {
          const newTask = Object.assign({}, task, {priority: task.priority - 1});
          Task.update(newTask);
          return newTask;
        }
      }
      return task;
    });
  } else {
    newTasks = state.tasks.map(task => {
      if (task.id === taskId) {
        const newTask = Object.assign({}, task, {labelId, content});
        Task.update(newTask);
        return newTask;
      }
      return task;
    });
  }
  dispatch({
    type: actionTypes.UPDATE_TASKS,
    tasks: newTasks,
  });
}

export function uncompletedTask(dispatch, taskId) {
  const task = {
    id: taskId,
    completed: false,
  };
  dispatch({
    type: actionTypes.UPDATE_TASK,
    task,
  });
  Task.update(task);
}

export function completedTask(dispatch, taskId) {
  const task = {
    id: taskId,
    completed: true,
  };
  dispatch({
    type: actionTypes.UPDATE_TASK,
    task,
  });
  Task.update(task);
}

export function deleteTask(dispatch, taskId) {
  const state = getState();

  const targetTask = find(state.tasks, taskId);
  const newTasks = state.tasks.filter(task => {
    return task.id !== taskId;
  }).map(task => {
    if (task.labelId === targetTask.labelId) {
      if (task.priority > targetTask.priority) {
        const newTask = Object.assign({}, task, {priority: task.priority - 1});
        return newTask;
      }
    }
    return task;
  });

  Task.delete(taskId);

  dispatch({
    type: actionTypes.DELETE_TASK,
    tasks: newTasks,
  });
}

export function sortTasks(dispatch, taskId, to) {
  const state = getState();

  const updatedTasks = [];

  const targetTask = find(state.tasks, taskId);
  const tasks = state.tasks.filter(task => {
    return (task.labelId === targetTask.labelId);
  }).sort((taskA, taskB) => {
    return (taskA.priority > taskB.priority) ? 1 : -1;
  });
  const from = targetTask.priority;

  if (from > to) {
    for (let index = to; index < from; index++) {
      const task_ = tasks[index];
      task_.priority += 1;
      updatedTasks.push(task_);
    }
    tasks[from].priority = to;
    updatedTasks.push(tasks[from]);
  } else if (from < to) {
    for (let index = from + 1; index <= to; index++) {
      const task_ = tasks[index];
      task_.priority -= 1;
      updatedTasks.push(task_);
    }
    tasks[from].priority = to;
    updatedTasks.push(tasks[from]);
  }
  const newTasks = state.tasks.map(task => {
    for (let index = 0; index < tasks.length; index++) {
      if (tasks[index].id === task.id) {
        return tasks[index];
      }
    }
    return task;
  });
  Task.bulkUpdate(updatedTasks);
  dispatch({
    type: actionTypes.SORT_TASKS,
    tasks: newTasks,
  });
}
