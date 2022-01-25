const dbconn = require('../config/dbConn')

const getClientes = () => {
  return new Promise((resolve, reject) => {
    dbconn.query(`SELECT * FROM cliente`, (err, result) => {
      if (err) {
        reject(err)
      }

      resolve(result)
    })
  })
}

const getClientesById = (id) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`SELECT * FROM cliente WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

const addCliente = (objCliente) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`INSERT INTO cliente (nombre, puntos) VALUES ('${objCliente.nombre}', ${objCliente.puntos}) RETURNING *`,
      (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

const updateCliente = (id, objCliente) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`UPDATE cliente SET nombre = '${objCliente.nombre}', puntos = ${objCliente.puntos} WHERE id = ${id}`,
      (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

const deleteCliente = (id) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`DELETE FROM cliente WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = {
  getClientes,
  addCliente,
  getClientesById,
  deleteCliente,
  updateCliente
}
