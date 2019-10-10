const Model = require('./model');

let resultS = []

async function getCarreras(filter) {
    let filterC = {}

    if (filter !== null) {
        filterC = { _id: filter }
    }
    try {
        const result = await Model.find(filterC);
        // return resultS;
        return result;
    } catch (err) {
        return err;
    }

}

async function addCarrera(carrera) {
    try{
        const myCarrera = new Model(carrera);
        return myCarrera.save();
    }catch(e){
        console.log(e);
        
    }
}

module.exports = {
    list: getCarreras,
    add: addCarrera
}