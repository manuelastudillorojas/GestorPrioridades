const dbconn = require('../config/dbConn')
const bcrypt = require("bcrypt")


const getUsuarios = () => {
    return new Promise((resolve, reject) => {
        dbconn.query(`SELECT * FROM usuarios ORDER BY correo ASC`, (err, result) => {
            if (err) {
                reject(err)
            }
    
            //console.log(result.rows)
            resolve(result)
        })
    }) 
}


const getUsuarioById = (id) => {

    return new Promise((resolve, reject) => {
        dbconn.query(`SELECT * FROM usuarios WHERE id = ${id}`, (err, result) => {
            if (err) {
                reject(err)
            }
    
            //console.log(result.rows)
            resolve(result)
        })
    }) 
}

const addUsuario = (objUser) => {

    return new Promise((resolve, reject) => {
        
        dbconn.query(`INSERT INTO public.usuarios(correo, contrasena, rol, nombre) VALUES('${objUser.correo}','${objUser.contrasena}','${objUser.rol}', '${objUser.nombre}') RETURNING *`, 
                (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
    })
}

const updateUsuario = (id, objUser) => {
    return new Promise((resolve, reject) => {
        dbconn.query(`UPDATE usuarios SET contrasena='${objUser.contrasena}', rol='${objUser.rol}', nombre='${objUser.nombre}' WHERE id=${id}`,
                (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
        }
    )
}

const deleteUsuario = (id) => {
    return new Promise((resolve, reject) => {
        dbconn.query(`DELETE FROM usuarios WHERE id=${id}`,
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
    getUsuarios,
    addUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioById
}