const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create user
    let user = await User.findOne({ where: { googleId: profile.id } });
    
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        username: profile.displayName || profile.emails[0].value.split('@')[0],
        isVerified: true
      });
    }
    
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Serialize/Deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
