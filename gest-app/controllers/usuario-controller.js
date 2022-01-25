const usuarioModel = require('../model/usuario-model')

/**
 * Función auxiliar para validar campos vacíos
 */
 const validaVacio = (datoIngreso) => {
    if(datoIngreso.trim() != '') {
      return true
    } else {
      return false
    }
  }

const sendJsonStatus = (res, statusCode, msg) => {
    res.status(statusCode).json(msg)
}

/**
 * API para buscar todos los usuarios
 */
const getUsuarios = async (req, res) => {

    try{
        const usuarios = await usuarioModel.getUsuarios()
        
        if (usuarios.rows.length == 0) {
            sendJsonStatus(res, 300, {
                msg : `No hay usuarios registrados`, 
                tipo: `error`
            })
        } else {
            sendJsonStatus(res, 200, {
                datos: usuarios.rows
            }) 
        }
    } catch (error) {
        sendJsonStatus(res, 500, error.message)
    }
}

/**
 * Busca los usuario por Correo
 * *Revisar si la busqueda por correo está bien
 */

const getUsuarioByEmail = async (req, res) => {
    try {
        if(validaVacio(req.params.mail)){
            const usuario = await usuarioModel.getUsuarioByEmail(req.params.mail)
            
            if(usuario.rows.length == 0){
                sendJsonStatus(res, 300, {
                    msg : `No hay usuarios registrados con el correo ${req.params.mail}`, 
                    tipo: `error`
                })
            } else {
                sendJsonStatus(res, 200, {
                    datos: usuario.rows
                })
            }
          } else {
            sendJsonStatus(res, 300, {
                msg: `Correo vacío`, 
                tipo: `error`
            })
          }

    } catch (error) {
        sendJsonStatus(res, 500, error.message)
    }
}

/**
 * Agrega un usuario
 * IMPORTANTE: Falta valida que el correo ya exita
 */
 const addUsuario = async (req, res) => {
    try {

        if(validaVacio(req.body.correo) && validaVacio(req.body.contrasena) && validaVacio(req.body.rol)) {

                const validaCorreoDuplicado = await usuarioModel.getUsuarioByEmail(req.body.correo)
                if(validaCorreoDuplicado.rowCount == 0) {
                    const usuario = await usuarioModel.addUsuario(req.body)
                    sendJsonStatus(res, 200, {
                        msg: {
                            info: `Se han ingresado correctamente`, 
                            datos: usuario.rows
                        }, 
                        tipo: `ok`
                    })
                } else {
                    sendJsonStatus(res, 300, {
                        msg: `Correo ya está registrado`, 
                        tipo: `error`
                    })
                }
            } else {
                sendJsonStatus(res, 300, {
                    msg: `Todos los datos deben contener informacion`, 
                    tipo: `error`
                })
            }

    } catch (error) {
        sendJsonStatus(res, 500, error.message)
    }
}

/**
 * Modifica un usuario buscado por correo
 */
 const updateUsuario = async (req, res) => {
    try {
        if(validaVacio(req.params.mail) && validaVacio(req.body.contrasena) && validaVacio(req.body.rol)){
                const usuario = await usuarioModel.updateUsuario(req.params.mail, req.body)
                sendJsonStatus(res, 200, {
                    msg: `Datos actualizados en ${usuario.rowCount} filas`, 
                    tipo: `ok`
                })
            } else {
                sendJsonStatus(res, 300, {
                    msg: `Todos los datos deben contener informacion`, 
                    tipo: `error`
                })
            }
    } catch (error) {
        sendJsonStatus(res, 500, error.message)
    }
}

/**
 * Elimina un usuario buscado por correo
 */
 const deleteUsuario = async (req, res) => {
    try {
        if(validaVacio(req.params.mail)) {
            const usuario = await usuarioModel.deleteUsuario(req.params.mail)
            sendJsonStatus(res, 200, {
                msg: `Cantidad de filas eliminadas: ${usuario.rowCount}`, 
                tipo: `ok`
            })
        } else {
            sendJsonStatus(res, 300, {
                msg: `Correo vacío`, 
                tipo: `error`
            })
        }
    } catch (error) {
        sendJsonStatus(res, 500, error.message)
    }
}

module.exports = {
    getUsuarios,
    getUsuarioByEmail,
    addUsuario,
    updateUsuario,
    deleteUsuario
}