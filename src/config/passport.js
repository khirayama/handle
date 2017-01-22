import passport from 'passport';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import {Strategy as InstagramStrategy} from 'passport-instagram';

import {User} from '../../models';

const hostname = (process.env.NODE_ENV === 'production') ? process.env.HOSTNAME : 'http://localhost:3000';

const config = {
  twitter: {
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: `${hostname}/auth/twitter/callback`,
  },
  instagram: {
    clientID: process.env.INSTAGRAM_KEY,
    clientSecret: process.env.INSTAGRAM_SECRET,
    callbackURL: `${hostname}/auth/instagram/callback`,
  },
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new TwitterStrategy(config.twitter,
  (token, tokenSecret, profile, done) => {
    User.findOrCreate({where: {
      provider: profile.provider,
      uid: profile.id,
    }, defaults: {
      provider: profile.provider,
      uid: profile.id,
      username: profile.username,
      imageUrl: profile.photos[0].value,
    }}).spread(user => {
      done(null, user);
    });
  }
));

passport.use(new InstagramStrategy(config.instagram,
  (token, tokenSecret, profile, done) => {
    User.findOrCreate({where: {
      provider: profile.provider,
      uid: profile.id,
    }, defaults: {
      provider: profile.provider,
      uid: profile.id,
      username: profile.username,
      imageUrl: profile._json.data.profile_picture,
    }}).spread(user => {
      done(null, user);
    });
  }
));
