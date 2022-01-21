const pool = require("../db");

const getCriticidad = () => {
  return new Promise((req, res) => {
    pool.query("SELECT * FROM criticidad", (err, result) => {
      if (err) {
        req(err);
      }

      res(result);
    });
  });
};

const getCriticidadId = (id) => {
  return new Promise((req, res) => {
    pool.query(
      "SELECT * FROM criticidad WHERE id = $1",
      [id],
      (err, result) => {
        if (err) {
          req(err);
        }
        res(result);
      }
    );
  });
};

const createCriticidad = () => {
  return new Promise((req, res) => {
    pool.query(
      "INSERT INTO criticidad (nombre, puntos, id_cliente) VALUES ($1, $2, $3) RETURNING *",
      [nombre, puntos],
      (err, result) => {
        if (err) {
          req(err);
        }
        res(result);
      }
    );
  });
};

const deleteCriticidad = (id) => {
  return new Promise((req, res) => {
    pool.query("DELETE FROM criticidad WHERE id = $1", [id], (err, result) => {
      if (err) {
        req(err);
      }
      res(result);
    });
  });
};

const updateCriticidad = (id) => {
  return new Promise((req, res) => {
    pool.query(
      "UPDATE criticidad SET nombre = $1, puntos = $2 , id_cliente = $3 WHERE id = $4 RETURNING*",
      [nombre, puntos, id],
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
  getCriticidad,
  createCriticidad,
  getCriticidadId,
  deleteCriticidad,
  updateCriticidad,
};
