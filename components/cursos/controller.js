const { list,add } = require('./store');
const { host,port,fileCursos,publicRoute } = require('../../config')

function listCursos(id){
    return new Promise((resolve, reject) => {
        resolve(list(id));
    })
}

function addCursos(data,files){
    return new Promise((resolve, reject) =>{       
        if(!data.nombre){
            console.log('[carrerasController] carrera no valida');
            reject("Los datos son incorrectos")
        }else{

            let curso = { carrera: data.carrera, nombre: data.nombre }

            if(files){
                curso = { 
                    ...curso, 
                    image: `${host}:${port}/${publicRoute}/${fileCursos}/${files[0].filename}`,
                    icon: `${host}:${port}/${publicRoute}/${fileCursos}/${files[1].filename}`
                }
            }
            add(curso)
            resolve(curso)
        }
    })
}

module.exports = {
    listCursos,
    addCursos
}