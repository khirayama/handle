import Task from 'universal/repositories/task';

export function fetchTasks() {
  return new Promise((resolve) => {
    Task.fetch().then((res) => {
      console.log(res);
      resolve();
    }).catch( e => console.log(e));
  });
}

export function createTask() {
  Task.create().then((res) => {
    console.log(res);
  });
}

export function updateTask() {
  Task.update().then((res) => {
    console.log(res);
  });
}

export function deleteTask() {
  Task.delete().then((res) => {
    console.log(res);
  });
}
