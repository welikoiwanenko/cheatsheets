const passport = require('./passport');

module.exports = router => {
  const isLoggedIn = async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      await next();
    } else {
      ctx.redirect('/api');
    }
  };

  router.get('/', async ctx => {
    if (ctx.req.user) {
      ctx.redirect('/api/success');
    } else {
      ctx.body = {
        status: 'success',
        data  : 'Hi! If you see this message, it means you\'re not login yet',
      };
    }
  });

  router.get('/login', passport.authenticate('facebook', {
    scope: [
      'public_profile',
      'email',
    ],
  }));

  router.get('/auth/callback', passport.authenticate('facebook', {
    successRedirect: '/api/success',
    failureRedirect: '/api',
  }));

  router.get('/success', isLoggedIn, async ctx => {
    ctx.body = {
      status: 'success',
      data  : ctx.req.user,
    };
  });

  router.get('/logout', isLoggedIn, async ctx => {
    ctx.logout();
    ctx.body = {
      status: 'success',
      data  : 'logout success',
    };
  });

  return router;
};
