const Router = require('koa-router');

const router = new Router();

router.get('/', async ctx => {
  ctx.body = { hello: 'cheatsheets.me' };
});

module.exports = router;
