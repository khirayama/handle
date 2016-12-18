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

export function authCallbackHandler(req, res) {
  const provider = req.params.provider;
  const authenticate = passport.authenticate(provider, {
    successRedirect: '/',
    failureRedirect: '/',
  });

  authenticate(req, res);
}

export function logoutHandler(req, res) {
  req.logout();
  res.redirect('/');
}
