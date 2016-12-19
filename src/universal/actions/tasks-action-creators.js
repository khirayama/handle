import Task from 'universal/repositories/task';

export function fetchTasks() {
  Task.fetch().then((res) => {
    console.log(res);
  });
}

export function createTask() {
  Task.create().then((res) => {
    console.log(res);
  });
}

export function updateTask() {
  Task.create().then((res) => {
    console.log(res);
  });
}

export function deleteTask() {
  Task.delete().then((res) => {
    console.log(res);
  });
}
