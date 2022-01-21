const pool = require("../db");

const getDeadline = () => {
  return new Promise((req, res) => {
    pool.query("SELECT * FROM deadline", (err, result) => {
      if (err) {
        req(err);
      }

      res(result);
    });
  });
};

const getDeadlineById = (id) => {
  return new Promise((req, res) => {
    pool.query("SELECT * FROM deadline WHERE id = $1", [id], (err, result) => {
      if (err) {
        req(err);
      }
      res(result);
    });
  });
};

const createDeadline = () => {
  return new Promise((req, res) => {
    pool.query(
      "INSERT INTO deadline (id_severidad, max_min, puntos) VALUES ($1, $2, $3) RETURNING *",
      [id_severidad, max_min, puntos],
      (err, result) => {
        if (err) {
          req(err);
        }
        res(result);
      }
    );
  });
};

const deleteDeadline = (id) => {
  return new Promise((req, res) => {
    pool.query("DELETE FROM deadline WHERE id = $1", [id], (err, result) => {
      if (err) {
        req(err);
      }
      res(result);
    });
  });
};

const updateDeadline = (id) => {
  return new Promise((req, res) => {
    pool.query(
      "UPDATE deadline SET  id_severidad =$1, max_min=$2, puntos = $3 WHERE id = $4 RETURNING*",
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
  getDeadline,
  createDeadline,
  getDeadlineById,
  deleteDeadline,
  updateDeadline,
};
