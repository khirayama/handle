import {Router} from 'express';

import {
  authHandler,
  authCallbackHandler,
  logoutHandler,
  destroyUserHandler,
} from 'handlers/auth-handlers';

const router = new Router();

router.use('/auth', new Router()
  .get('/:provider', authHandler)
  .get('/:provider/callback', authCallbackHandler)
);
router.get('/logout', logoutHandler);
router.get('/destroy_user', destroyUserHandler);

export default router;
