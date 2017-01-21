import passport from 'passport';

export function authHandler(req, res) {
  const provider = req.params.provider;

  let scope = null;

  switch (provider) {
    case 'instagram':
      scope = ['basic', 'public_content', 'follower_list', 'comments', 'relationships', 'likes'];
      break;
    default:
      break;
  }

  const authenticate = passport.authenticate(provider, {scope});

  authenticate(req, res);
}

export function authCallbackHandler(req, res, next) {
  const provider = req.params.provider;
  const authenticate = passport.authenticate(provider, (err, user, info) => {
    if (!user || err) {
      return res.redirect('/');
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/dashboard');
    });
  });

  authenticate(req, res, next);
}

export function logoutHandler(req, res) {
  req.logout();
  res.redirect('/');
}
