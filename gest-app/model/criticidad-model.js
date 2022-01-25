const dbconn = require('../config/dbConn')

const getCriticidad = () => {
  return new Promise((resolve, reject) => {
    dbconn.query(`SELECT * FROM criticidad`, (err, result) => {
      if (err) {
        reject(err)
      }

      resolve(result)
    })
  })
}

const getCriticidadId = (id) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`SELECT * FROM criticidad WHERE id = ${id}`,
      (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

const addCriticidad = (objCriticidad) => {
  return new Promise((resolve, reject) => {
    dbconn.query(
      `INSERT INTO criticidad (nombre, puntos, id_cliente) VALUES ('${objCriticidad.nombre}', ${objCriticidad.puntos}, ${objCriticidad.id_cliente}) RETURNING *`,
      (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

const updateCriticidad = (id, objCriticidad) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`UPDATE criticidad SET nombre = '${objCriticidad.nombre}', puntos = ${objCriticidad.puntos} , id_cliente = ${objCriticidad.id_cliente} WHERE id = ${id}`,
      (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

const deleteCriticidad = (id) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`DELETE FROM criticidad WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}



module.exports = {
  getCriticidad,
  addCriticidad,
  getCriticidadId,
  deleteCriticidad,
  updateCriticidad
}
