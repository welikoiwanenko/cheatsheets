const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-generic-session');
const mongoose = require('mongoose');

const app = new Koa();
const router = new Router();

const api = require('./api')(router);
const config = require('./config');
const passport = require('./passport');

// MongoDB
console.log('connecting to MongoDB...');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cheatsheets', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

app.keys = config.session.keys;

app.use(session(app));

app.use(passport.initialize());
app.use(passport.session());

router.use('/api', api.routes());

app.use(router.routes());

module.exports = app;
