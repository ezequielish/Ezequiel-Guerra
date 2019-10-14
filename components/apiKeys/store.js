const Model = require('./model')

async function getApiKey(filter) {
    let filterApiKey = {}

    if (filter !== null) {
        filterApiKey = { token: filter }
    }
    try {
        const [result] = await Model.find(filterApiKey);
        // return resultS;
        return result;
    } catch (err) {
        return err;
    }
}

module.exports = getApiKey