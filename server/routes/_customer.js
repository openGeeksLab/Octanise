import {Router} from 'express';
import customerAction from '../actions/customer';
import userAction from '../actions/user';

const appRouter = Router();

export default function(app) {
  app.use('/api/v1/customer', appRouter);


  appRouter.all('/*',async (req, res, next) => {
    if (!req.session 
        || !req.session.passport 
        || !req.session.passport.user 
        || !req.session.passport.user.role 
        || req.session.passport.user.role !== 'customer') {
      return res.status(400).send('User is not customer');
    }
    next();
  });

  appRouter.post('/inviteSupplier',async (req, res, next) => {
    try {
      res.send(await customerAction.inviteSupplier(req.body, req.session.passport.user));
    }
    catch (e) {
      res.status(400).send(e);
    }
  });

  appRouter.get('/invitations',async (req, res, next) => {
    try {
      res.send(await customerAction.getInvitations(req.session.passport.user));
    }
    catch (e) {
      res.status(400).send(e);
    }
  });

  appRouter.get('/invitation/:id',async (req, res, next) => {
    try {
      res.send(await customerAction.getInvitation(req.params.id ,req.session.passport.user));
    }
    catch (e) {
      res.status(400).send(e);
    }
  });

  appRouter.get('/suppliers',async (req, res, next) => {
    try {
      res.send(await customerAction.getSuppliers(req.session.passport.user));
    }
    catch (e) {
      res.status(400).send(e);
    }
  });

  appRouter.get('/supplier/:id',async (req, res, next) => {
    try {
      res.send(await customerAction.getSupplier(req.params.id ,req.session.passport.user));
    }
    catch (e) {
      res.status(400).send(e);
    }
  });
};