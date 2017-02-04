import passport from 'passport';

export function authHandler(req, res) {
  const provider = req.params.provider;

  const scope = null;
  const authenticate = passport.authenticate(provider, {scope});

  authenticate(req, res);
}

export function authCallbackHandler(req, res, next) {
  const provider = req.params.provider;
  const authenticate = passport.authenticate(provider, (err, user) => {
    if (!user || err) {
      return res.redirect('/');
    }
    req.login(user, err => {
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
