const eventsModel = require('../model/events-model')
const clientsModel = require('../model/cliente-model')
const criticidadModel = require("../model/criticidad-model")
const severidadModel = require("../model/severidad-model")




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


const getClientById = async (id_cliente) => {

    const cliente = await clientsModel.getClientesById(id_cliente)

    return cliente
}

const getAllDataEventsActived = async (req, res) => {
    
    try {
        const eventos = await eventsModel.getEvents()

        if (eventos.rows.length == 0) {

            sendJsonStatus(res, 300, { 
                msg: `No hay eventos registrados`, 
                tipo: `error` 
            })
        } else {

            //console.log('evento:', eventos.rows)

            let objEvent = []
            

            for (i = 0; i < eventos.rows.length; i++) {

                let ev = eventos.rows[i]
                let cliente = await clientsModel.getClientesById(ev.id_cliente)

                let criticidad = await criticidadModel.getCriticidadId(ev.id_criticidad)

                let severidad = await severidadModel.getSeveridadById(ev.id_severidad)

                objEvent.push({
                    'id_evento': ev.id,
                    'hora_registro': ev.hora_registro,
                    'descripcion': ev.descripcion,
                    'estado': ev.estado,
                    'cliente': cliente.rows[0].nombre,
                    'pnts_cliente': cliente.rows[0].puntos,
                    'criticidad': criticidad.rows[0].nombre,
                    'pnts_criticidad': criticidad.rows[0].puntos,
                    'severidad': severidad.rows[0].nombre,
                    'pnts_severidad': severidad.rows[0].puntos,
                    'puntaje_prio': ev.puntaje_prio
                })         

            }

            

            console.log('objeto evento:', objEvent) 

            sendJsonStatus(res, 200, { 
                    datos: objEvent 
                }
            )
        }
    } catch (error) {
        sendJsonStatus(res, 500, error.message)
    }
}

module.exports = {
    getAllDataEventsActived
}