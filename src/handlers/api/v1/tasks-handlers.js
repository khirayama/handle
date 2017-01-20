export function tasksIndexHandler(req, res) {
  const now = new Date();

  const labels = [{
    id: 0,
    name: 'today',
  }, {
    id: 1,
    name: 'later',
  }, {
    id: 2,
    name: 'schedule',
  }];

  const tasks = [];

  labels.forEach((label, labelIndex) => {
    for (let index = 0; index < 3; index++) {
      tasks.push({
        id: (labelIndex * 10) + index,
        content: `${label.name} taks ${index}`,
        order: index,
        completed: false,
        labelId: label.id,
        createdAt: now,
        updateAt: now,
      });
    }
  });

  res.json(tasks);
}

export function tasksCreateHandler(req, res) {
  const now = new Date();

  res.json({
    id: 1,
    content: 'task',
    completed: false,
    createdAt: now,
    updateAt: now,
    order: 0,
    labelId: 0,
  });
}

export function tasksUpdateHandler(req, res) {
  const now = new Date();

  res.json({
    id: 1,
    content: 'updated task',
    completed: false,
    createdAt: now,
    updateAt: now,
    order: 0,
    labelId: 0,
  });
}

export function tasksDeleteHandler(req, res) {
  res.json({id: 1});
}
