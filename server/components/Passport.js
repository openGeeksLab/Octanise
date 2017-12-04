import {Strategy as LocalStrategy} from 'passport-local';
import passport from 'passport';
import * as _ from 'lodash';
import config from '../config';
import userAction from '../actions/user';


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd',
  },
  async function(email, password, done) {
    try {
      const user = await userAction.login({email, password});
      return done(null, user);
    }
    catch (e) {
      done(e)
    }
  }
));

// // Serialize the user id to push into the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// // Deserialize user object
passport.deserializeUser(function (id, done) {
  done(null, id)
});

export default passport;