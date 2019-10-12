// DEBUG=app:* node scripts/seedUsers.js
const bcrypt = require('bcrypt');
const chalk = require('chalk');
const debug = require('debug')('app:scripts:users');
const Model = require('../components/users/model')
const { urldb } = require('../config')
const db = require("../db")

const users = [
    {

        username: 'root@undefined.sh',
        name: 'ROOT',
        password: 'secret',
        isAdmin: true
    },
    {
        username: 'jose@undefined.sh',
        name: 'Jose Maria',
        password: 'public'
    },
    {
        username: 'maria@undefined.sh',
        name: 'Maria Jose',
        password: 'public'
    }
]

async function createUser(user) {
    const { username, name, password, isAdmin } = user
    const hashedPassword = await bcrypt.hash(password, 10)
    const userF = {
        name,
        username,
        password: hashedPassword,
        isAdmin: Boolean(isAdmin)
    }

    return userF
}

async function seedUsers() {
    try{

       users.map( async (user,i) =>{
            let userSchema = await createUser(user)
            let userModel =  new Model(userSchema)
           
            userModel.save()
            debug(chalk.green('User created with:', userModel._id));
        }) 
    }catch(err){
        debug(chalk.red(err));
        process.exit(1);
    }
}

db(urldb)
seedUsers()