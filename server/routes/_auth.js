import {Router} from 'express';
import passport from '../components/Passport';
import userAction from '../actions/user';

const appRouter = Router();

export default function(app) {
  app.use('/api/v1/auth', appRouter);

  appRouter.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.send(userAction.omitUserData({user: req.session.passport.user}));
      // res.redirect('/');
  });

  appRouter.post('/registration',async (req, res, next) => {
    try {
      const user = await userAction.registration(req.body);
      req.session.passport = {user};
      res.send(user);
    }
    catch (e) {
      res.status(400).send(e);
    }
  });

  appRouter.get('/currentUser',async (req, res, next) => {
    try {
      if (req.session && req.session.passport && req.session.passport.user) {
        return res.send(userAction.omitUserData({user: req.session.passport.user}));
      }
      throw ('User is not authorised');
    }
    catch (e) {
      res.status(400).send(e);
    }
  });
};