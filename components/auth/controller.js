const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const getApiKey = require('../apiKeys/store');
const { authJwtSecret } = require('../../config');
require('../../utils/auth/strategies/basic');
function signin(apiKeyToken, req, res, next) {
  return new Promise(async (resolve, reject) => {
    if (!apiKeyToken) {
      reject(boom.unauthorized('apiKeyToken is required'));
    }
    passport.authenticate('basic', function (error, user) {
      try {
        if (error || !user) {
          reject(boom.unauthorized());
        }
        req.login(user, { session: false }, async function (error) {
          if (error) {
            reject(error);
          }

          const apiKey = await getApiKey(apiKeyToken);//validamos el api-key token
          if (!apiKey) {
            reject(boom.unauthorized());
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
    })(req, res, next);
  })

}
module.exports = {
  signin
}

//   // Basic strategy

//   passport.authenticate('basic', function(error, user) {
//     try {
//       if (error || !user) {
//         next(boom.unauthorized());
//       }

//       req.login(user, { session: false }, async function(error) {
//         if (error) {
//           next(error);
//         }

//         const apiKey = await getApiKey({ token: apiKeyToken });

//         if (!apiKey) {
//           next(boom.unauthorized());
//         }

//         const { _id: id, name, username } = user;

//         const payload = {
//           sub: id,
//           name,
//           username,
//           scopes: apiKey.scopes
//         };

//         const token = jwt.sign(payload, authJwtSecret, {//firmamo con el secret
//           expiresIn: '15m'
//         });

//         return res.status(200).json({ token, user: { id, name, email } });
//       });
//     } catch (error) {
//       next(error);
//     }
//   })(req, res, next);
