import {Router} from 'express';

import {
  indexTasksHandler,
  createTaskHandler,
  updateTaskHandler,
  destroyTaskHandler,
  updateTasksHandler,
} from 'handlers/api/v1/tasks-handlers';
import {
  indexLabelsHandler,
  createLabelHandler,
  updateLabelHandler,
  destroyLabelHandler,
  updateLabelsHandler,
} from 'handlers/api/v1/labels-handlers';

const router = new Router();

router.use('/api', new Router()
  .use('/v1', new Router()
    .get('/tasks', indexTasksHandler)
    .post('/tasks', createTaskHandler)
    .put('/tasks/:id', updateTaskHandler)
    .delete('/tasks/:id', destroyTaskHandler)
    .put('/tasks', updateTasksHandler)

    .get('/labels', indexLabelsHandler)
    .post('/labels', createLabelHandler)
    .put('/labels/:id', updateLabelHandler)
    .delete('/labels/:id', destroyLabelHandler)
    .put('/labels', updateLabelsHandler)
  )
);

export default router;
