const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy
const boom = require('@hapi/boom');

const { getUser } = require('../../../components/users/controller')
const { authJwtSecret } = require('../../../config');

passport.use(
  new JwtStrategy(
    {
      secretOrKey: authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function(tokenPayload, cb) {
  
      try {
        const user = await getUser(tokenPayload.username);
        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        delete user.password;
        cb(null, { ...user, scopes: tokenPayload.scopes });
      } catch (error) {
        return cb(error);
      }
    }
  )
);