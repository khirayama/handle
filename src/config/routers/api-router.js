import {Router} from 'express';

// import {
//   tasksIndexHandler,
//   tasksCreateHandler,
//   tasksUpdateHandler,
//   tasksDeleteHandler,
// } from 'app/handlers/api/v1/tasks-handlers';
// import {
//   labelsIndexHandler,
//   labelsCreateHandler,
//   labelsUpdateHandler,
//   labelsDeleteHandler,
// } from 'app/handlers/api/v1/labels-handlers';

const router = new Router();

// router.use('/api', new Router()
//   .use('/v1', new Router()
//     .get('/tasks', tasksIndexHandler)
//     .post('/tasks', tasksCreateHandler)
//     .put('/tasks', tasksUpdateHandler)
//     .delete('/tasks', tasksDeleteHandler)
//
//     .get('/labels', labelsIndexHandler)
//     .post('/labels', labelsCreateHandler)
//     .put('/labels', labelsUpdateHandler)
//     .delete('/labels', labelsDeleteHandler)
//   )
// );

export default router;
