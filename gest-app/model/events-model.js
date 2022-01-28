const dbconn = require('../config/dbConn')

const getEvents = () => {
    return new Promise((resolve, reject) => {
        dbconn.query(`SELECT * FROM evento ORDER BY id ASC`, (err, result) => {
            if (err) {
                reject(err)
            }
    
            //console.log(result.rows)
            resolve(result)
        })
    }) 
}

const getEventById = (id) => {

    return new Promise((resolve, reject) => {
        dbconn.query(`SELECT * FROM evento WHERE id = ${id}`, (err, result) => {
            if (err) {
                reject(err)
            }
    
            //console.log(result.rows)
            resolve(result)
        })
    }) 
}

const addEvent = (objEvent) => {

    return new Promise((resolve, reject) => {
        dbconn.query(`INSERT INTO evento(id, descripcion, hora_registro, estado, puntaje_prio, id_cliente, id_criticidad, id_severidad)
                    VALUES (nextval('evento_id_seq'), '${objEvent.descripcion}', '${objEvent.hora_registro}', '${objEvent.estado}', ${objEvent.puntaje_prio},
                    ${objEvent.id_cliente}, ${objEvent.id_criticidad}, ${objEvent.id_severidad}) RETURNING *`, 
                (err, result) => {
                    if (err) {
                        reject(err)
                    }

                    resolve(result)
                })
    })
}

const updateEvent = (id, objEvent) => {
    return new Promise((resolve, reject) => {
        dbconn.query(`UPDATE evento SET descripcion = '${objEvent.descripcion}', hora_registro = '${objEvent.hora_registro}', estado = '${objEvent.estado}', 
                  puntaje_prio = ${objEvent.puntaje_prio}, id_cliente = ${objEvent.id_cliente}, id_criticidad = ${objEvent.id_criticidad}, 
                  id_severidad = ${objEvent.id_severidad} 
                  WHERE id = ${id}`,
                (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    //Acá debo agregar que el componente se actualice en la tabla evento_componente
                    resolve(result)
                })
        }
    )
}

const deleteEvent = (id) => {
    return new Promise((resolve, reject) => {
        dbconn.query(`DELETE FROM evento WHERE id = ${id}`,
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
    getEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent
}