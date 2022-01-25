const clienteModel = require("../model/cliente-model")

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

const getClientes = async (req, res) => {
  try {
    const cliente = await clienteModel.getClientes()

    if (cliente.rows.length == 0) {
      sendJsonStatus(res, 300, {
        msg: `No hay clientes registrados`, 
        tipo: `error`,
      })
    } else {
      sendJsonStatus(res, 200, { datos: cliente.rows })
    }
  } catch (error) {
    sendJsonStatus(res, 500, error.message)
  }
}

const getClientesById = async (req, res) => {
  try {
    if (validaVacio(req.params.id)) {
      const cliente = await clienteModel.getClientesById(req.params.id)

      if (cliente.rows.length == 0) {
        sendJsonStatus(res, 300, {
          msg: `No hay clientes registrados con el id ${req.params.id}`,
          tipo: `error`
        })
      } else {
        sendJsonStatus(res, 200, { datos: cliente.rows })
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

const addCliente = async (req, res) => {
  try {
    if (validaVacio(req.body.nombre) && validaVacio(req.body.puntos)) {
      const cliente = await clienteModel.addCliente(req.body)
      sendJsonStatus(res, 200, { 
        msg: { 
          info: `Se han ingresado correctamente`, 
          datos: cliente.rows 
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

const deleteCliente = async (req, res) => {
  try {
    if (validaVacio(req.params.id)) {
      const cliente = await clienteModel.deleteCliente(req.params.id)
      sendJsonStatus(res, 200, {
        msg: `Cantidad de filas eliminadas: ${cliente.rowCount}`,
        tipo: `ok`
      })
    } else {
      sendJsonStatus(res, 300, { 
        msg: `Cliente no encontrado`, 
        tipo: `error` 
      })
    }
  } catch (error) {
    sendJsonStatus(res, 500, error.message)
  }
}

const updateCliente = async (req, res) => {
  try {
    if (validaVacio(req.params.id) && validaVacio(req.body.nombre) && validaVacio(req.body.puntos)) {
      const cliente = await clienteModel.updateCliente(req.params.id, req.body)
      sendJsonStatus(res, 200, {
        msg: `Datos actualizados en ${cliente.rowCount} filas`,
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
  getClientes,
  addCliente,
  getClientesById,
  deleteCliente,
  updateCliente,
}
