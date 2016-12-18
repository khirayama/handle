import {Router} from 'express';

import {
  authHandler,
  authCallbackHandler,
  logoutHandler,
} from 'app/handlers/auth-handlers';
import {applicationHandler} from 'app/handlers/application-handlers';

const router = new Router();

router.use('/auth', new Router()
  .get('/:provider', authHandler)
  .get('/:provider/callback', authCallbackHandler)
);
router.get('/logout', logoutHandler);
router.get('/*', applicationHandler);

export default router;
