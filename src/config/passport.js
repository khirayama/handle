import passport from 'passport';
import {Strategy as TwitterStrategy} from 'passport-twitter';

import getLocalAddress from 'libs/get-local-address';

import {User, Task, Label} from 'models';

const {ipv4} = getLocalAddress();
const hostname = (process.env.NODE_ENV === 'production') ? process.env.HOSTNAME : `http://${ipv4[0].address}:3000`;

const config = {
  twitter: {
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: `${hostname}/auth/twitter/callback`,
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
    }}).spread((user, created) => {
      if (created) {
        Label.bulkCreate([{
          userId: user.id,
          name: 'TODAY',
          priority: 0,
          visibled: true,
        }, {
          userId: user.id,
          name: 'LATER',
          priority: 1,
          visibled: true,
        }, {
          userId: user.id,
          name: 'SCHEDULE',
          priority: 2,
          visibled: true,
        }]).then(() => {
          Label.findOne({
            where: {userId: user.id, priority: 0},
          }).then(label => {
            Task.bulkCreate([{
              userId: user.id,
              labelId: label.id,
              content: 'Swipe right to complete!',
              priority: 0,
              completed: false,
            }, {
              userId: user.id,
              labelId: label.id,
              content: 'Swipe left to delete!',
              priority: 1,
              completed: false,
            }, {
              userId: user.id,
              labelId: label.id,
              content: 'Hold task to sort!',
              priority: 2,
              completed: false,
            }, {
              userId: user.id,
              labelId: label.id,
              content: '↓ click "Add task"!',
              priority: 3,
              completed: false,
            }]).then(() => {
              done(null, user);
            });
          });
        });
      } else {
        done(null, user);
      }
    });
  }
));
