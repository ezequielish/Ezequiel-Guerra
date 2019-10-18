const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const { getUser } = require('../../../components/users/controller')
const { authJwtSecret } = require('../../../config');

console.log(authJwtSecret)
passport.use(
  new Strategy(
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