const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { urldb, publicRoute } = require('./config')
const db = require("./db")
const { routes } = require('./network/routes')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

routes(app)
db(urldb)

app.use(`/${publicRoute}`, express.static('public'));

app.listen(3000, () =>{
    console.log(`Escuchando en el puerto ${3000}`)
})

