export function tasksIndexHandler(req, res) {
  const now = new Date();

  res.json([{
    id: 1,
    content: 'today task 1',
    completed: false,
    createdAt: now,
    updateAt: now,
    order: 0,
    labelId: 0,
  }, {
    id: 2,
    content: 'today task 2',
    completed: false,
    createdAt: now,
    updateAt: now,
    order: 0,
    labelId: 0,
  }, {
    id: 3,
    content: 'later task 1',
    completed: false,
    createdAt: now,
    updateAt: now,
    order: 0,
    labelId: 1,
  }, {
    id: 4,
    content: 'schedule task 1',
    completed: false,
    createdAt: now,
    updateAt: now,
    order: 0,
    labelId: 2,
  }]);
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
