import {Router} from 'express';

import {
  indexTasksHandler,
  createTaskHandler,
  updateTaskHandler,
  destroyTaskHandler,
} from 'handlers/api/v1/tasks-handlers';
import {
  indexLabelsHandler,
  createLabelHandler,
  updateLabelHandler,
  destroyLabelHandler,
} from 'handlers/api/v1/labels-handlers';

const router = new Router();

router.use('/api', new Router()
  .use('/v1', new Router()
    .get('/tasks', indexTasksHandler)
    .post('/tasks', createTaskHandler)
    .put('/tasks/:id', updateTaskHandler)
    .delete('/tasks/:id', destroyTaskHandler)

    .get('/labels', indexLabelsHandler)
    .post('/labels', createLabelHandler)
    .put('/labels/:id', updateLabelHandler)
    .delete('/labels/:id', destroyLabelHandler)
  )
);

export default router;
