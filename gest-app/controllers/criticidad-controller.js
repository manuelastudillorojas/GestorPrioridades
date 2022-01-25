const criticidadModel = require("../model/criticidad-model")

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

const getCriticidad = async (req, res) => {
  try {
    const criticidad = await criticidadModel.getCriticidad()

    if (criticidad.rows.length == 0) {
      sendJsonStatus(res, 300, {
        msg: `No hay datos registrados`,
        tipo: `error`
      })
    } else {
      sendJsonStatus(res, 200, { 
        datos: criticidad.rows 
      })
    }
  } catch (error) {
    sendJsonStatus(res, 500, error.message)
  }
}

const getCriticidadId = async (req, res) => {
  try {
    if (validaVacio(req.params.id)) {
      const criticidad = await criticidadModel.getCriticidadId(req.params.id)

      if (criticidad.rows.length == 0) {
        sendJsonStatus(res, 300, {
          msg: `No hay datos registrados con el id ${req.params.id}`,
          tipo: `error`
        })
      } else {
        sendJsonStatus(res, 200, { 
          datos: criticidad.rows 
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

const addCriticidad = async (req, res) => {
  try {
    if (validaVacio(req.body.nombre) && validaVacio(req.body.puntos) && validaVacio(req.body.id_cliente)) {
      const criticidad = await criticidadModel.addCriticidad(req.body)
      sendJsonStatus(res, 200, {
        msg: { 
          info: `Se han ingresado correctamente`,
          datos: criticidad.rows },
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

const deleteCriticidad = async (req, res) => {
  try {
    if (validaVacio(req.params.id)) {
      const criticidad = await criticidadModel.deleteCriticidad(req.params.id)
      sendJsonStatus(res, 200, {
        msg: `Cantidad de filas eliminadas: ${criticidad.rowCount}`,
        tipo: `ok`
      })
    } else {
      sendJsonStatus(res, 300, { 
        msg: ` no encontrado`, 
        tipo: `error` 
      })
    }
  } catch (error) {
    sendJsonStatus(res, 500, error.message)
  }
}

const updateCriticidad = async (req, res) => {
  try {
    if (validaVacio(req.params.id) && validaVacio(req.body.nombre) && validaVacio(req.body.puntos) && validaVacio(req.body.id_cliente)) {
      const criticidad = await criticidadModel.updateCriticidad(req.params.id, req.body)

      sendJsonStatus(res, 200, {
        msg: `Datos actualizados en ${criticidad.rowCount} filas`,
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
  getCriticidad,
  addCriticidad,
  getCriticidadId,
  deleteCriticidad,
  updateCriticidad,
}
