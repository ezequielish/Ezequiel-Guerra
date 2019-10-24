const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { urldb, publicRoute } = require('./config')
const db = require("./db")
const helmet = require("helmet");
const cors = require("cors");
const { routes } = require('./network/routes')

//const corsOptions = { origin: "http://localhost:8080" };
const corsOptions = { origin: "https://ezequielish.github.io/ezequiel" };
// var whitelist = ['http://localhost:3000/', 'http://localhost:8080']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
app.use(helmet());
app.use(cors(corsOptions));
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

routes(app)
db(urldb)

const {
    logErrors,
    wrapErrors,
    errorHandler
  } = require('./utils/middlewares/errorHandlers.js');
  

app.use(`/${publicRoute}`, express.static('public'));

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


app.listen(port, () =>{
    console.log(`Escuchando en el puerto ${port}`)
})

