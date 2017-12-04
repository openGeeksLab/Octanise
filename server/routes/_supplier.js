import {Router} from 'express';
import supplierAction from '../actions/supplier';

const appRouter = Router();

export default function(app) {
  app.use('/api/v1/supplier', appRouter);


  appRouter.all('/*',async (req, res, next) => {
    if (!req.session 
        || !req.session.passport 
        || !req.session.passport.user 
        || !req.session.passport.user.role 
        || req.session.passport.user.role !== 'supplier') {
      return res.status(400).send('User is not supplier');
    }
    next();
  });

  appRouter.put('/acceptInvitation',async (req, res, next) => {
    try {
      res.send(await supplierAction.acceptInvitation(req.body, req.session.passport.user));
    }
    catch (e) {
      res.status(400).send(e);
    }
  });

  appRouter.put('/declineInvitation',async (req, res, next) => {
    try {
      res.send(await supplierAction.declineInvitation(req.body, req.session.passport.user));
    }
    catch (e) {
      res.status(400).send(e);
    }
  });

  appRouter.get('/invitations',async (req, res, next) => {
    try {
      res.send(await supplierAction.getInvitations(req.session.passport.user));
    }
    catch (e) {
      res.status(400).send(e);
    }
  });

  appRouter.get('/invitation/:id',async (req, res, next) => {
    try {
      res.send(await supplierAction.getInvitation(req.params.id ,req.session.passport.user));
    }
    catch (e) {
      res.status(400).send(e);
    }
  });


  appRouter.get('/customers',async (req, res, next) => {
    try {
      res.send(await supplierAction.getCustomers(req.session.passport.user));
    }
    catch (e) {
      res.status(400).send(e);
    }
  });

  appRouter.get('/customer/:id',async (req, res, next) => {
    try {
      res.send(await supplierAction.getCustomer(req.params.id ,req.session.passport.user));
    }
    catch (e) {
      res.status(400).send(e);
    }
  });

};