const dbconn = require('../config/dbConn')

const getComponente = () => {
  return new Promise((resolve, reject) => {
    dbconn.query(`SELECT * FROM componente`, (err, result) => {
      if (err) {
        reject(err)
      }

      resolve(result)
    })
  })
}

const getComponenteById = (id) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`SELECT * FROM componente WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

const addComponente = (objComponente) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`INSERT INTO componente (nombre, puntos) VALUES ('${objComponente.nombre}', ${objComponente.puntos}) RETURNING *`,
      (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

const updateComponente = (id, objComponente) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`UPDATE componente SET nombre = '${objComponente.nombre}', puntos = ${objComponente.puntos} WHERE id = ${id}`,
      (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

const deleteComponente = (id) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`DELETE FROM componente WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = {
  getComponente,
  addComponente,
  getComponenteById,
  deleteComponente,
  updateComponente
}
