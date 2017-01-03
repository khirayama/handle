import {Router} from 'express';

import {
  authHandler,
  authCallbackHandler,
  logoutHandler,
} from 'handlers/auth-handlers';

const router = new Router();

router.use('/auth', new Router()
  .get('/:provider', authHandler)
  .get('/:provider/callback', authCallbackHandler)
);
router.get('/logout', logoutHandler);

export default router;
