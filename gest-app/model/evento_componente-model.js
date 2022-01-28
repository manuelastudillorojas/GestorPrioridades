const dbconn = require('../config/dbConn')



const getEventoComponente = () => {
    return new Promise((resolve, reject) => {
        dbconn.query(`SELECT * FROM evento_componente ORDER BY id ASC`, (err, result) => {
            if (err) {
                reject(err)
            }
    
            //console.log(result.rows)
            resolve(result)
        })
    }) 
}

const getEventoComponenteById = (id) => {

    return new Promise((resolve, reject) => {
        dbconn.query(`SELECT * FROM evento_componente WHERE id = ${id}`, (err, result) => {
            if (err) {
                reject(err)
            }
    
            //console.log(result.rows)
            resolve(result)
        })
    }) 
}

const getEventoComponenteByIdEvento = (id_evento) => {

    return new Promise((resolve, reject) => {
        dbconn.query(`SELECT * FROM evento_componente WHERE id_evento = ${id_evento}`, (err, result) => {
            if (err) {
                reject(err)
            }
    
            //console.log(result.rows)
            resolve(result)
        })
    }) 
}

const getEventoComponenteByIdComponente = (id_componente) => {

    return new Promise((resolve, reject) => {
        dbconn.query(`SELECT * FROM evento_componente WHERE id_componente = ${id_componente}`, (err, result) => {
            if (err) {
                reject(err)
            }
    
            //console.log(result.rows)
            resolve(result)
        })
    }) 
}


const addEventoComponente = (objEventComp) => {

    return new Promise((resolve, reject) => {
        dbconn.query(`INSERT INTO evento_componente(id_componente, id_evento) VALUES (${objEventComp.id_componente}, ${objEventComp.id_evento}) RETURNING *`, 
                (err, result) => {
                    if (err) {
                        reject(err)
                    }

                    resolve(result)
                })
    })
}

const updateEventoComponente = (id, objEventComp) => {
    return new Promise((resolve, reject) => {
        dbconn.query(`UPDATE evento_componente SET id_componente = ${objEventComp.id_componente}, id_evento = ${objEventComp.id_evento} WHERE id = ${id}`,
                (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
        }
    )
}


const deleteEventoComponente = (id) => {
    return new Promise((resolve, reject) => {
        dbconn.query(`DELETE FROM evento_componente WHERE id = ${id}`,
                (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
        }
    )
}


module.exports = {
    getEventoComponente,
    getEventoComponenteById,
    getEventoComponenteByIdComponente,
    getEventoComponenteByIdEvento,
    addEventoComponente,
    updateEventoComponente,
    deleteEventoComponente
}