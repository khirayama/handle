import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'cookie-session';
import passport from 'passport';
import useragent from 'express-useragent';
import compression from 'compression';

import i18n from 'libs/micro-i18n';
import getLocalAddress from 'libs/get-local-address';

import apiRouter from 'config/routers/api-router';
import authRouter from 'config/routers/auth-router';
import uiRouter from 'config/routers/ui-router';

import 'config/passport';

const app = express();

const port = process.env.PORT || 3000;
const {ipv4} = getLocalAddress();

// Middleware
app.use(compression({
  threshold: 0,
  level: 9,
  memLevel: 9,
}));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(useragent.express());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  keys: [process.env.SECRET_KEY],
  name: '_handle_session',
  maxAge: 1000 * 60 * 24 * 365,
}));
app.use((req, res, next) => {
  // Priority: query - setting - cookie - default
  const locale = req.query.lang || req.cookies._handle_locale || req.locale || i18n.defaultLocale;

  req.getLocale = () => locale;
  res.cookie('_handle_locale', locale);
  next();
});

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Router
app.use(apiRouter);
app.use(authRouter);
app.use(uiRouter);

app.listen(port, '0.0.0.0', () => {
  const hostname = (ipv4[0]) ? ipv4[0].address : 'localhost';
  console.log(`NODE_ENV: ${process.env.NODE_ENV}.`);
  console.log(`open http://${hostname}:${port}`);
  console.log(`open http://${hostname}:${port}/dashboard`);
});
