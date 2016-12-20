export function tasksIndexHandler(req, res) {
  const now = new Date();

  res.json([{
    id: 1,
    content: 'task',
    completed: false,
    createdAt: now,
    updateAt: now,
    order: 0,
    label: {
      id: 0,
      name: 'TODAY',
    },
  }, {
    id: 2,
    content: 'task',
    completed: false,
    createdAt: now,
    updateAt: now,
    order: 0,
    label: {
      id: 0,
      name: 'TODAY',
    },
  }]);
}

export function tasksCreateHandler(req, res) {
  const now = new Date();

  res.json({
    id: 0,
    content: 'task',
    completed: false,
    createdAt: now,
    updateAt: now,
    order: 0,
    label: {
      id: 0,
      name: 'TODAY',
    },
  });
}

export function tasksUpdateHandler(req, res) {
  const now = new Date();

  res.json({
    id: 0,
    content: 'updated task',
    completed: false,
    createdAt: now,
    updateAt: now,
    order: 0,
    label: {
      id: 0,
      name: 'TODAY',
    },
  });
}

export function tasksDeleteHandler(req, res) {
  res.json({id: 0});
}
