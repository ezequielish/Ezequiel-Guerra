const boom = require('@hapi/boom');

function scopesValidationHandler(allowedScopes) {
  return function(req, res, next) {

    // console.log(req.user.scopes)
    if (!req.user || (req.user && !req.user.scopes)) {
      next(boom.unauthorized('Missing scopes'));
    }
    const hasAccess = allowedScopes
      .map(allowedScope => req.user.scopes.includes(allowedScope))
      .find(allowed => Boolean(allowed));//return true || false

    if (hasAccess) {
      next();
    } else {
      next(boom.unauthorized(), false)
      return
    }
  };
}

module.exports = scopesValidationHandler;