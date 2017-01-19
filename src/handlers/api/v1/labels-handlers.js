export function labelsIndexHandler(req, res) {
  const now = new Date();

  res.json([{
    id: 0,
    name: 'TODAY',
    order: 0,
    visibled: true,
    createdAt: now,
    updateAt: now,
  }, {
    id: 1,
    name: 'LATER',
    order: 1,
    visibled: true,
    createdAt: now,
    updateAt: now,
  }, {
    id: 2,
    name: 'SCHEDULE',
    order: 2,
    visibled: true,
    createdAt: now,
    updateAt: now,
  }]);
}

export function labelsCreateHandler(req, res) {
  const now = new Date();

  res.json({
    id: 0,
    name: 'TODAY',
    order: 0,
    createdAt: now,
    updateAt: now,
  });
}

export function labelsUpdateHandler(req, res) {
  const now = new Date();

  res.json({
    id: 0,
    name: 'UPDATED TODAY',
    order: 0,
    createdAt: now,
    updateAt: now,
  });
}

export function labelsDeleteHandler(req, res) {
  res.json({id: 0});
}
