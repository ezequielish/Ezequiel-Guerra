const Model = require('./model');

let resultS = []

async function getCursos(filterCurso) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterCurso !== null) {
            filter = { _id: filterCurso };
        }

        Model.find(filter)
            .populate('carrera')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }
                
                resolve(populated);
            });
    })

}

async function addCurso(curso) {
    try{
        const myCurso = new Model(curso);
        return myCurso.save();
    }catch(e){
        console.log(e);
        
    }
}

module.exports = {
    list: getCursos,
    add: addCurso
}