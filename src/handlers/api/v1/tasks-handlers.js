export function tasksIndexHandler(req, res) {
  const now = new Date();

  const labels = ['today', 'later', 'schedule'];
  const tasks = [];

  for (let index = 0; index < 30; index++) {
    const i = Math.floor(Math.random() * 3);
    const label = labels[i];

    tasks.push({
      id: index,
      content: `${label} taks ${index}`,
      createdAt: now,
      updateAt: now,
      order: index,
      labelId: i,
    });
  }

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
