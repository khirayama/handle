import {Router} from 'express';

import {
  authHandler,
  authCallbackHandler,
  logoutHandler,
} from 'app/handlers/auth-handlers';
import {
  tasksIndexHandler,
  tasksCreateHandler,
  tasksUpdateHandler,
  tasksDeleteHandler,
} from 'app/handlers/api/v1/tasks-handlers';
import {
  labelsIndexHandler,
  labelsCreateHandler,
  labelsUpdateHandler,
  labelsDeleteHandler,
} from 'app/handlers/api/v1/labels-handlers';
import {applicationHandler} from 'app/handlers/application-handlers';

const router = new Router();

router.use('/auth', new Router()
  .get('/:provider', authHandler)
  .get('/:provider/callback', authCallbackHandler)
);
router.get('/logout', logoutHandler);

router.use('/api', new Router()
  .use('/v1', new Router()
    .get('/tasks', tasksIndexHandler)
    .post('/tasks', tasksCreateHandler)
    .put('/tasks', tasksUpdateHandler)
    .delete('/tasks', tasksDeleteHandler)

    .get('/labels', labelsIndexHandler)
    .post('/labels', labelsCreateHandler)
    .put('/labels', labelsUpdateHandler)
    .delete('/labels', labelsDeleteHandler)
  )
);

router.get('/*', applicationHandler);

export default router;
