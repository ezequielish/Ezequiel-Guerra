const Model = require('./model');

let resultS = []

async function getUser(filterUser) {
        let filter = {}

        if (filterUser !== null) {
            filter = { username: filterUser }
        }
        try {
            const result = await Model.find(filter);
            // return resultS;
            return result;
        } catch (err) {
            return err;
        }

}

async function addUser(user) {
    try {
        const myUser = new Model(user);
        return myUser.save();
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    list: getUser,
    add: addUser
}