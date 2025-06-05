const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Configure passport
const initializePassport = () => {
  // Auth utilities
  const getToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

  // Strategies
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return done(null, false);
      
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return done(null, false);
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findByPk(jwtPayload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }));

  return {
    passport,
    getToken
  };
};

module.exports = initializePassport();
