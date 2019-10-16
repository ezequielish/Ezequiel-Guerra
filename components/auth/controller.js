const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const getApiKey = require('../apiKeys/store');
const { authJwtSecret } = require('../../config');
require('../../utils/auth/strategies/basic');
function signin(apiKeyToken, req, res) {
  return new Promise(async (resolve, reject) => {
    if (!apiKeyToken) {
      reject(boom.unauthorized('apiKeyToken is required'));
    }
    passport.authenticate('basic', function (error, user) {//aplicamos nuestra estrategia basic
      try {
        if (error || !user) {
          reject(boom.unauthorized());
          return
        }
        req.login(user, { session: false }, async function (error) {
          if (error) {
            reject(error);
            return
          }

          const apiKey = await getApiKey(apiKeyToken);//validamos el api-key token
          if (!apiKey) {
            reject(boom.unauthorized());
            return
          }

          const { _id: id, name, username } = user;

          const payload = {
            sub: id,
            name,
            username,
            scopes: apiKey.scopes
          };

          const token = jwt.sign(payload, authJwtSecret, {
            expiresIn: '15m'
          });
          resolve({ token, user: { id, name, username } })
        });
      } catch (err) {
        reject(err)
      }
    })(req, res);
  })

}
module.exports = {
  signin
}
