const { add } = require('./store');
const bcrypt = require('bcrypt');

async function hashUser(user) {
    const { username, name, password } = user
    const hashedPassword = await bcrypt.hash(password, 10)
    const userF = {
        name,
        username,
        password: hashedPassword,
        isAdmin: Boolean(false)
    }

    return userF
}

function signup(username,password,name){
    return new Promise(async (resolve, reject) =>{       
        if(!username || !password || !name){
            console.log('[UsersController] usuario no valido');
            reject("Los datos son incorrectos")
        }else{
            let user = {
                name,
                username,
                password
            }

            const userSchema = await hashUser(user)
            delete user.password
            add(userSchema)
            resolve(user)
        }
    })
}

module.exports = {
    // listCursos,
    signup
}