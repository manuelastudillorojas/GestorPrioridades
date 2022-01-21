const pool = require("../db");

const getSeveridad = () => {
  return new Promise((req, res) => {
    pool.query("SELECT * FROM severidad", (err, result) => {
      if (err) {
        req(err);
      }

      res(result);
    });
  });
};

const getSeveridadById = (id) => {
  return new Promise((req, res) => {
    pool.query("SELECT * FROM severidad WHERE id = $1", [id], (err, result) => {
      if (err) {
        req(err);
      }
      res(result);
    });
  });
};

const createSeveridad = () => {
  return new Promise((req, res) => {
    pool.query(
      "INSERT INTO severidad (nombre, puntos, id_cricididad) VALUES ($1, $2, $3) RETURNING *",
      [nombre, puntos, id_cricididad],
      (err, result) => {
        if (err) {
          req(err);
        }
        res(result);
      }
    );
  });
};

const deleteSeveridad = (id) => {
  return new Promise((req, res) => {
    pool.query("DELETE FROM severidad WHERE id = $1", [id], (err, result) => {
      if (err) {
        req(err);
      }
      res(result);
    });
  });
};

const updateSeveridad = (id) => {
  return new Promise((req, res) => {
    pool.query(
      "UPDATE severidad SET nombre =$1, puntos =$2, id_cricididad =$3 WHERE id = $4 RETURNING*",
      [nombre, puntos, id_cricididad, id],
      (err, result) => {
        if (err) {
          req(err);
        }
        res(result);
      }
    );
  });
};

module.exports = {
  getSeveridad,
  createSeveridad,
  getSeveridadById,
  deleteSeveridad,
  updateSeveridad,
};
