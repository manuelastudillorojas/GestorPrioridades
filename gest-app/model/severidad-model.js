const dbconn = require('../config/dbConn')

const getSeveridadByAttr = (attr, index) => {

  return new Promise((resolve, reject) => {
    dbconn.query(`SELECT * FROM severidad WHERE ${attr} = ${index}`, (err, result) => {
      if (err) {
        reject(err)
      }

      resolve(result)
    })
  })
}

const getSeveridad = () => {
  return new Promise((resolve, reject) => {
    dbconn.query(`SELECT * FROM severidad`, (err, result) => {
      if (err) {
        reject(err)
      }

      resolve(result)
    })
  })
}

const getSeveridadById = (id) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`SELECT * FROM severidad WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

const addSeveridad = (objSeveridad) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`INSERT INTO severidad (nombre, puntos, id_criticidad) VALUES ('${objSeveridad.nombre}', ${objSeveridad.puntos}, ${objSeveridad.id_criticidad}) RETURNING *`,
      (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

const updateSeveridad = (id, objSeveridad) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`UPDATE severidad SET nombre = '${objSeveridad.nombre}', puntos = ${objSeveridad.puntos}, id_criticidad = ${objSeveridad.id_criticidad} WHERE id = ${id}`,
      (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

const deleteSeveridad = (id) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`DELETE FROM severidad WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = {
  getSeveridad,
  addSeveridad,
  getSeveridadById,
  deleteSeveridad,
  updateSeveridad,
  getSeveridadByAttr
}
