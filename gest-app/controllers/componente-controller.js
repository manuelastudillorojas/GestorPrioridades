const componenteModel = require("../model/componente-model")

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

const getComponente = async (req, res) => {
  try {
    const componente = await componenteModel.getComponente()

    if (componente.rows.length == 0) {
      sendJsonStatus(res, 300, {
        msg: `No hay Componentes registrados`, 
        tipo: `error`,
      })
    } else {
      sendJsonStatus(res, 200, { datos: componente.rows })
    }
  } catch (error) {
    sendJsonStatus(res, 500, error.message)
  }
}

const getComponenteById = async (req, res) => {
  try {
    if (validaVacio(req.params.id)) {
      const componente = await componenteModel.getComponenteById(req.params.id)

      if (componente.rows.length == 0) {
        sendJsonStatus(res, 300, {
          msg: `No hay Componente registrados con el id ${req.params.id}`,
          tipo: `error`
        })
      } else {
        sendJsonStatus(res, 200, { datos: componente.rows })
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

const addComponente = async (req, res) => {
  try {
    if (validaVacio(req.body.nombre) && validaVacio(req.body.puntos) && validaVacio(req.body.id_cliente)) {
      const componente = await componenteModel.addComponente(req.body)
      sendJsonStatus(res, 200, { 
        msg: { 
          info: `Se han ingresado correctamente`, 
          datos: componente.rows 
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

const deleteComponente = async (req, res) => {
  try {
    if (validaVacio(req.params.id)) {
      const componente = await componenteModel.deleteComponente(req.params.id)
      sendJsonStatus(res, 200, {
        msg: `Cantidad de filas eliminadas: ${componente.rowCount}`,
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

const updateComponente = async (req, res) => {
  try {
    if (validaVacio(req.params.id) && validaVacio(req.body.nombre) && validaVacio(req.body.puntos) && validaVacio(req.body.id_cliente)) {
      const componente = await componenteModel.updateComponente(req.params.id, req.body)
      sendJsonStatus(res, 200, {
        msg: `Datos actualizados en ${componente.rowCount} filas`,
        tipo: `ok`,
      })
    } else {
      sendJsonStatus(res, 300, {
        msg: `Todos los datos deben contener informacion`,
        tipo: `error`,
      })
    }
  } catch (error) {
    sendJsonStatus(res, 500, error.message)
  }
}

module.exports = {
  getComponente,
  addComponente,
  getComponenteById,
  deleteComponente,
  updateComponente,
}
