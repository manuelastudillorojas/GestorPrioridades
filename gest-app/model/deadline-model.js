const dbconn = require('../config/dbConn')

const getDeadline = () => {
  return new Promise((resolve, reject) => {
    dbconn.query(`SELECT * FROM deadline`, (err, result) => {
      if (err) {
        reject(err)
      }

      resolve(result)
    })
  })
}

const getDeadlineById = (id) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`SELECT * FROM deadline WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

const addDeadline = (objDeadline) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`INSERT INTO deadline (id_severidad, max_min, puntos) VALUES (${objDeadline.id_severidad}, ${objDeadline.max_min}, ${objDeadline.puntos}) RETURNING *`,
      (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

const updateDeadline = (id, objDeadline) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`UPDATE deadline SET id_severidad = ${objDeadline.id_severidad}, max_min = ${objDeadline.max_min}, puntos = ${objDeadline.puntos} WHERE id = ${id}`,
      (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

const deleteDeadline = (id) => {
  return new Promise((resolve, reject) => {
    dbconn.query(`DELETE FROM deadline WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}



module.exports = {
  getDeadline,
  addDeadline,
  getDeadlineById,
  deleteDeadline,
  updateDeadline
}
