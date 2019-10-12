// DEBUG=app:* node scripts/seedApiKeyToken.js.js
const crypto = require('crypto');
const chalk = require('chalk');
const debug = require('debug')('app:scripts:users');
const Model = require('../components/apiTokens/model')
const { urldb } = require('../config')
const db = require("../db")

const adminScopes = [
    'sigin:auth',
    'signup:auth',
    'read:carreras',
    'read:cursos',
    'create:carrera',
    'create:cursos'

]

const publicScopes = [
    'sigin:auth',
    'signup:auth',
    'read:carreras',
    'read:cursos'
]

const apiKeys = [
    {
        token: generateRandomToken(),
        scopes: adminScopes
    },
    {
        token: generateRandomToken(),
        scopes: publicScopes
    }
];


function generateRandomToken() {
    const buffer = crypto.randomBytes(32);
    return buffer.toString('hex');
}

async function seedApiKeys() {
    try {

        apiKeys.map(async apiKey => {
            let apikey =  new Model(apiKey)
            apikey.save()
        });

        // await Promise.all(promises);
        debug(chalk.green(`${apiKeys.length} api keys have been created succesfully`)); // prettier-ignore
        // return process.exit(0);
    } catch (error) {
        debug(chalk.red(error));
        process.exit(1);
    }
}

db(urldb)
seedApiKeys();