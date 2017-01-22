import {Task} from '../../../../models';

export function tasksIndexHandler(req, res) {
  Task.findAll({
    where: {
      UserId: req.user.id,
    },
    order: [['priority', 'ASC']],
  }).then(tasks => {
    res.json(tasks);
  });
}

export function tasksCreateHandler(req, res) {
  Task.create({
    content: req.body.content,
    priority: req.body.priority,
    UserId: req.user.id,
  }).then(task => {
    res.json(task);
  });
}

export function tasksUpdateHandler(req, res) {
  Task.findById(req.body.id).then(task => {
    task.update({
      content: req.body.content,
      priority: req.body.priority,
    }).then(() => {
      res.json(task);
    });
  });
}

export function tasksDeleteHandler(req, res) {
  Task.findById(req.body.id).then(task => {
    task.destroy().then(destroyedTask => {
      res.json(destroyedTask);
    });
  });
}
