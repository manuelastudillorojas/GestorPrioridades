const eventoComponenteModel = require("../model/evento_componente-model")

const validaVacio = (datoIngreso) => {
  if (datoIngreso.trim() != "") {
    return true
  } else {
    return false
  }
}

const sendJsonStatus = (res, statusCode, msg) => {
  res.status(statusCode).json(msg)
}

const getEventoComponente = async (req, res) => {
  try {
    const eventoComponente = await eventoComponenteModel.getEventoComponente()

    if (eventoComponente.rows.length == 0) {
      sendJsonStatus(res, 300, {
        msg: `No hay relaciones registradas`, 
        tipo: `error`,
      })
    } else {
      sendJsonStatus(res, 200, { datos: eventoComponente.rows })
    }
  } catch (error) {
    sendJsonStatus(res, 500, error.message)
  }
}

const getEventoComponenteById = async (req, res) => {
  try {
    if (validaVacio(req.params.id)) {
      const eventoComponente = await eventoComponenteModel.getEventoComponenteById(req.params.id)

      if (eventoComponente.rows.length == 0) {
        sendJsonStatus(res, 300, {
          msg: `No hay Componente registrados con el id ${req.params.id}`,
          tipo: `error`
        })
      } else {
        sendJsonStatus(res, 200, { datos: eventoComponente.rows })
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

const getEventoComponenteByIdEvento = async (req, res) => {
  try {
    if (validaVacio(req.params.id_evento)) {
      const eventoComponente = await eventoComponenteModel.getEventoComponenteByIdEvento(req.params.id_evento)

      if (eventoComponente.rows.length == 0) {
        sendJsonStatus(res, 300, {
          msg: `No hay Componente registrados con el id ${req.params.id_evento}`,
          tipo: `error`
        })
      } else {
        sendJsonStatus(res, 200, { datos: eventoComponente.rows })
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

const getEventoComponenteByIdComponente = async (req, res) => {
  try {
    if (validaVacio(req.params.id_componente)) {
      const eventoComponente = await eventoComponenteModel.getEventoComponenteByIdComponente(req.params.id_componente)

      if (eventoComponente.rows.length == 0) {
        sendJsonStatus(res, 300, {
          msg: `No hay Componente registrados con el id ${req.params.id_componente}`,
          tipo: `error`
        })
      } else {
        sendJsonStatus(res, 200, { datos: eventoComponente.rows })
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

const addEventoComponente = async (req, res) => {
  try {
    if (validaVacio(req.body.id_evento) && validaVacio(req.body.id_componente)) {
      const eventoComponente = await eventoComponenteModel.addEventoComponente(req.body)
      sendJsonStatus(res, 200, { 
        msg: { 
          info: `Se han ingresado correctamente`, 
          datos: eventoComponente.rows 
        },
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

const deleteEventoComponente = async (req, res) => {
  try {
    if (validaVacio(req.params.id)) {
      const eventoComponente = await eventoComponenteModel.deleteEventoComponente(req.params.id)
      sendJsonStatus(res, 200, {
        msg: `Cantidad de filas eliminadas: ${eventoComponente.rowCount}`,
        tipo: `ok`
      })
    } else {
      sendJsonStatus(res, 300, { 
        msg: `Componente no encontrado`, 
        tipo: `error` 
      })
    }
  } catch (error) {
    sendJsonStatus(res, 500, error.message)
  }
}

const updateEventoComponente = async (req, res) => {
  try {
    if (validaVacio(req.params.id) && validaVacio(req.body.id_componente) && validaVacio(req.body.id_evento)) {
      const eventoComponente = await eventoComponenteModel.updateEventoComponente(req.params.id, req.body)
      sendJsonStatus(res, 200, {
        msg: `Datos actualizados en ${eventoComponente.rowCount} filas`,
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


module.exports = {
  getEventoComponente,
  getEventoComponenteById,
  getEventoComponenteByIdComponente,
  getEventoComponenteByIdEvento,
  addEventoComponente,
  updateEventoComponente,
  deleteEventoComponente
}
