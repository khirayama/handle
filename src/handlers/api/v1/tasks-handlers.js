import {sequelize, Task} from 'models';

function omit(task) {
  return {
    id: task.id,
    labelId: task.labelId,
    content: task.content,
    priority: task.priority,
    completed: task.completed,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}

export function indexTasksHandler(req, res) {
  Task.findAll({
    where: {userId: req.user.id},
    order: [['labelId', 'ASC'], ['priority', 'ASC']],
  }).then(tasks => {
    res.json(tasks.map(task => {
      return omit(task);
    }));
  });
}

export function createTaskHandler(req, res) {
  Task.create({
    userId: req.user.id,
    labelId: req.body.labelId,
    content: req.body.content,
    priority: req.body.priority,
    completed: false,
  }).then(task => {
    res.json(task);
  });
}

export function updateTaskHandler(req, res) {
  Task.findById(req.params.id).then(task => {
    task.update({
      labelId: (req.body.labelId === undefined) ? task.labelId : req.body.labelId,
      content: (req.body.content === undefined) ? task.content : req.body.content,
      priority: (req.body.priority === undefined) ? task.priority : req.body.priority,
      completed: (req.body.completed === undefined) ? task.completed : req.body.completed,
    }).then(() => {
      res.json(omit(task));
    });
  });
}

export function destroyTaskHandler(req, res) {
  Task.findById(req.params.id).then(task => {
    task.destroy().then(destroyedTask => {
      res.json(omit(destroyedTask));
    });
  });
}

export function updateTasksHandler(req, res) {
  const tasks = req.body;

  sequelize.transaction().then(t => {
    let count = 0;
    tasks.forEach(newTask => {
      Task.findById(newTask.id, {transaction: t}).then(task => {
        task.update({
          labelId: (newTask.labelId === undefined) ? task.labelId : newTask.labelId,
          content: (newTask.content === undefined) ? task.content : newTask.content,
          priority: (newTask.priority === undefined) ? task.priority : newTask.priority,
          completed: (newTask.completed === undefined) ? task.completed : newTask.completed,
        }, {transaction: t}).then(task_ => {
          count += 1;
          if (count === tasks.length) {
            t.commit();
          }
        });
      });
    });
  }).then(() => {
    Task.findAll({
      where: {userId: req.user.id},
      order: [['labelId', 'ASC'], ['priority', 'ASC']],
    }).then(tasks => {
      res.json(tasks.map(task => {
        return omit(task);
      }));
    });
  });
}
