const  { list } = require('../../../components/users/store')
const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

passport.use(
  new BasicStrategy(async function(username, password, cb) {
    try {
      const user = await list(username);
      if (!user[0]) {
        return cb(boom.unauthorized(), false);
      }
      if (!(await bcrypt.compare(password, user[0].password))) {
        return cb(boom.unauthorized(), false);
      }

      // delete user[0].password;
      
      return cb(null, user[0]);
    } catch (error) {
      return cb(error);
    }
  })
);