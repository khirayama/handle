import {Router} from 'express';

import {
  tasksIndexHandler,
  tasksCreateHandler,
  tasksUpdateHandler,
  tasksDeleteHandler,
} from 'handlers/api/v1/tasks-handlers';
import {
  labelsIndexHandler,
  labelsCreateHandler,
  labelsUpdateHandler,
  labelsDeleteHandler,
} from 'handlers/api/v1/labels-handlers';

const router = new Router();

router.use('/api', new Router()
  .use('/v1', new Router()
    .get('/tasks', tasksIndexHandler)
    .post('/tasks', tasksCreateHandler)
    .put('/tasks/:id', tasksUpdateHandler)
    .delete('/tasks/:id', tasksDeleteHandler)

    .get('/labels', labelsIndexHandler)
    .post('/labels', labelsCreateHandler)
    .put('/labels/:id', labelsUpdateHandler)
    .delete('/labels/:id', labelsDeleteHandler)
  )
);

export default router;
