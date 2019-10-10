const { list, add } = require('./store');
const { host,port,fileRoute,publicRoute } = require('../../config')

function listCarreras(id){
    const result =  list(id);
    return result;
}

function addCarreras(data,files){
    return new Promise((resolve, reject) =>{       
        if(!data.nombre){
            console.log('[carrerasController] carrera no valida');
            reject("Los datos son incorrectos")
        }else{
            let carrera = { nombre: data.nombre }

            if(files){
                carrera = { 
                    ...carrera, 
                    image: `${host}:${port}/${publicRoute}/${fileRoute}/${files[0].filename}`,
                    icon: `${host}:${port}/${publicRoute}/${fileRoute}/${files[1].filename}`
                }
            }
            add(carrera)
            resolve(carrera)
        }
        
    })
}

module.exports = {
    listCarreras,
    addCarreras
}