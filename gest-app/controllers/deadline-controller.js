const deadlineModel = require("../model/deadline-model")

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

const getDeadline = async (req, res) => {
  try {
    const deadline = await deadlineModel.getDeadline()

    if (deadline.rows.length == 0) {
      sendJsonStatus(res, 300, {
        msg: `No hay registros`,
        tipo: `error`
      })
    } else {
      sendJsonStatus(res, 200, { 
        datos: deadline.rows 
      })
    }
  } catch (error) {
    sendJsonStatus(res, 500, error.message)
  }
}

const getDeadlineById = async (req, res) => {
  try {
    if (validaVacio(req.params.id)) {
      const deadline = await deadlineModel.getDeadlineById(req.params.id)

      if (deadline.rows.length == 0) {
        sendJsonStatus(res, 300, {
          msg: `No hay  registros con el id ${req.params.id}`,
          tipo: `error`
        })
      } else {
        sendJsonStatus(res, 200, { 
          datos: deadline.rows 
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

const addDeadline = async (req, res) => {
  try {
    if (validaVacio(req.body.id_severidad) && validaVacio(req.body.max_min) && validaVacio(req.body.puntos)) {
      const deadline = await deadlineModel.addDeadline(req.body)

      sendJsonStatus(res, 200, {
        msg: {
          info: `Se han ingresado los datos correctamente`,
          datos: deadline.rows
        },
        tipo: `ok`,
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

const deleteDeadline = async (req, res) => {
  try {
    if (validaVacio(req.params.id)) {
      const deadline = await deadlineModel.deleteDeadline(req.params.id)
      sendJsonStatus(res, 200, {
        msg: `Cantidad de filas eliminadas: ${deadline.rowCount}`,
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

const updateDeadline = async (req, res) => {
  try {
    if (validaVacio(req.params.id) && validaVacio(req.body.id_severidad) && validaVacio(req.body.max_min) && validaVacio(req.body.puntos)) {
      const deadline = await deadlineModel.updateDeadline(req.params.id, req.body)

      sendJsonStatus(res, 200, {
        msg: `Datos actualizados en ${deadline.rowCount} filas`,
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
  getDeadline,
  addDeadline,
  getDeadlineById,
  deleteDeadline,
  updateDeadline,
}
