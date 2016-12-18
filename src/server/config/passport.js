import passport from 'passport';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import {Strategy as InstagramStrategy} from 'passport-instagram';

const config = {
  twitter: {
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
  },
  instagram: {
    clientID: process.env.INSTAGRAM_KEY,
    clientSecret: process.env.INSTAGRAM_SECRET,
    callbackURL: 'http://localhost:3000/auth/instagram/callback',
  },
};

export function setup() {
  passport.serializeUser((user, done) => {
    done(null, {id: user.id});
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new TwitterStrategy(config.twitter,
    (token, tokenSecret, profile, done) => {
      done(null, profile);
    }
  ));

  passport.use(new InstagramStrategy(config.instagram,
    (token, tokenSecret, profile, done) => {
      done(null, profile);
    }
  ));
}
