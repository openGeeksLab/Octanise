import {Router} from 'express';
const appRouter = Router();

export default function(app) {
  app.use('/', appRouter);

  appRouter.all([
    '/*',
  ], function(req, res, next) {
    res.render('index',{});
  });
};