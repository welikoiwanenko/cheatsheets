const passport = require('koa-passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const config = require('./config').facebook;
const User = require('./models/user');

passport.use(new FacebookStrategy({
  clientID     : config.clientId,
  clientSecret : config.clientSecret,
  callbackURL  : config.callbackUrl,
  profileFields: config.profileFields,
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ facebook_id: profile.id });
  if (!user) {
    console.log('User not found, creating...');
    const newUser = new User({
      name       : profile.displayName,
      avatar     : profile.photos[0].value,
      email      : profile.emails[0].value,
      facebook_id: profile.id,
    });
    user = await newUser.save();
  }
  return done(null, user);
}));

passport.serializeUser(({ name, avatar }, done) => {
  done(null, {
    name,
    avatar,
  });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
