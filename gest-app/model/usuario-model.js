const dbconn = require('../config/dbConn')

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

const getUsuarioByEmail = (correo) => {

    return new Promise((resolve, reject) => {
        dbconn.query(`SELECT * FROM usuarios WHERE correo = '${correo}'`, (err, result) => {
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
        dbconn.query(`INSERT INTO public.usuarios(correo, contrasena, rol) VALUES('${objUser.correo}','${objUser.contrasena}','${objUser.rol}') RETURNING *`, 
                (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
    })
}

const updateUsuario = (correo, objUser) => {
    return new Promise((resolve, reject) => {
        dbconn.query(`UPDATE usuarios SET contrasena='${objUser.contrasena}', rol='${objUser.rol}' WHERE correo='${correo}'`,
                (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
        }
    )
}

const deleteUsuario = (correo) => {
    return new Promise((resolve, reject) => {
        dbconn.query(`DELETE FROM usuarios WHERE correo='${correo}'`,
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
    getUsuarioByEmail,
    addUsuario,
    updateUsuario,
    deleteUsuario
}