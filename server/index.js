import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import session from 'express-session';
import connectRedis from 'connect-redis';
import flash from 'connect-flash';
import redis from 'redis';
import favicon from 'serve-favicon';
import { createServer } from 'http';
import expressDomainMiddleware from 'express-domain-middleware';
import tmplEngine from 'ejs-locals-improved';

import Bootstrap from './components/Bootstrap';
import config from './config';
import db from './db';
import passport from './components/Passport';

const RedisStore = connectRedis(session);
const app = express();
const http = createServer(app);

app.use(expressDomainMiddleware);

app.engine('html', tmplEngine);
app.set('views', path.join(__dirname, '/../client'));
app.set('view engine', 'html');
app.set('env', config.NODE_ENV || 'development');

app.use(favicon(__dirname + '/../client/favicon.ico'));
app.use(express.static(path.join(__dirname, '/../client')));

app.use(bodyParser.json({ limit : '50mb' }));
app.use(bodyParser.urlencoded({ limit : '50mb', extended: false }));
app.use(expressValidator());
app.use(cookieParser());

// Redis session storage
app.use(session({
 store: new RedisStore(config.redis),
  secret: config.sessionSecret,
  cookie: config.sessionCookie,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// // routers here
Bootstrap.routes(app);

const serverProcess = http.listen(config.http.port, function() {
  console.log([new Date(), 'Test Server Started on', config.http.port].join(' '));
});