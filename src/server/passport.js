import passport from 'passport';
import passportJWT from 'passport-jwt';
import TwitterStrategy from 'passport-twitter';
import jwt from 'jsonwebtoken';
import UserService from './api/users/service';
import config from './config';

passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromHeader('authorization'),
      secretOrKey: config.auth.jwt.secret,
    },
    (jwtPayload, next) => {
      return UserService.getById(jwtPayload._id)
        .then(user => next(null, user))
        .catch(err => next(err));
    },
  ),
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: config.auth.twitter.key,
      consumerSecret: config.auth.twitter.secret,
      callbackURL: config.auth.twitter.callbackURL,
      // proxy: trustProxy
    },
    (token, tokenSecret, profile, cb) => {
      return cb(null, { ...profile, token, tokenSecret });
    },
  ),
);

export function createToken(data) {
  try {
    return jwt.sign(data, config.auth.jwt.secret);
  } catch (e) {
    return null;
  }
}

export default passport;
