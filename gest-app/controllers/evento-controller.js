const eventsModel = require('../model/events-model')

/**
 * Función auxiliar para validar campos vacíos
 */
const validaVacio = (datoIngreso) => {
    if (datoIngreso.trim() != '') {
        return true
    } else {
        return false
    }
}

const sendJsonStatus = (res, statusCode, msg) => {
    res.status(statusCode).json(msg)
}

/**
 * API para buscar todos los eventos
 */
const getEvents = async (req, res) => {

    try {
        const eventos = await eventsModel.getEvents()

        if (eventos.rows.length == 0) {
            sendJsonStatus(res, 300, { 
                msg: `No hay eventos registrados`, 
                tipo: `error` 
            })
        } else {
            sendJsonStatus(res, 200, { 
                datos: eventos.rows }
                )
        }
    } catch (error) {
        sendJsonStatus(res, 500, error.message)
    }
}

/**
 * Busca los eventos por ID
 */

const getEventById = async (req, res) => {
    try {
        if (validaVacio(req.params.id)) {
            const evento = await eventsModel.getEventById(req.params.id)

            if (evento.rows.length == 0) {
                sendJsonStatus(res, 300, { 
                    msg: `No hay eventos registrados con el id ${req.params.id}`, 
                    tipo: `error` 
                })
            } else {
                sendJsonStatus(res, 200, { 
                    datos: evento.rows 
                })
            }
        } else {
            sendJsonStatus(res, 300, { 
                msg: `Id vacío`, 
                tipo: `error` 
            })
        }

    } catch (error) {
        sendJsonStatus(res, 500, error.message)
    }
}

/**
 * Agrega un evento
 */
const addEvent = async (req, res) => {
    try {

        if (validaVacio(req.body.descripcion) && validaVacio(req.body.hora_registro) && validaVacio(req.body.estado) && validaVacio(req.body.puntaje_prio) && validaVacio(req.body.id_cliente)
            && validaVacio(req.body.id_componente) && validaVacio(req.body.id_criticidad) && validaVacio(req.body.id_severidad)) {

            const evento = await eventsModel.addEvent(req.body)
            sendJsonStatus(res, 200, { 
                msg: { 
                    info: `Se han ingresado correctamente`, 
                    datos: evento.rows },
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
 * Modifica un evento buscado por id
 */
const updateEvent = async (req, res) => {
    try {
        if (validaVacio(req.params.id) && validaVacio(req.body.descripcion) && validaVacio(req.body.hora_registro) && validaVacio(req.body.estado) && validaVacio(req.body.puntaje_prio) && validaVacio(req.body.id_cliente)
            && validaVacio(req.body.id_componente) && validaVacio(req.body.id_criticidad) && validaVacio(req.body.id_severidad)) {
            const evento = await eventsModel.updateEvent(req.params.id, req.body)
            sendJsonStatus(res, 200, { 
                msg: `Datos actualizados en ${evento.rowCount} filas`, 
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
 * Elimina un eveno buscado por id
 */
const deleteEvent = async (req, res) => {
    try {
        if (validaVacio(req.params.id)) {
            const evento = await eventsModel.deleteEvent(req.params.id)
            sendJsonStatus(res, 200, { 
                msg: `Cantidad de filas eliminadas: ${evento.rowCount}`, 
                tipo: `ok` 
            })
        } else {
            sendJsonStatus(res, 300, { 
                msg: `Id vacío`, 
                tipo: `error` 
            })
        }
    } catch (error) {
        sendJsonStatus(res, 500, error.message)
    }
}

module.exports = {
    getEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent
}