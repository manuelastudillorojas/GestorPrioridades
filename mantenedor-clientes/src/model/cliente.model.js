const pool = require("../db");

const getClientes = () => {
  return new Promise((req, res) => {
    pool.query("SELECT * FROM cliente", (err, result) => {
      if (err) {
        req(err);
      }

      res(result);
    });
  });
};

const getClientesById = (id) => {
  return new Promise((req, res) => {
    pool.query("SELECT * FROM cliente WHERE id = $1", [id], (err, result) => {
      if (err) {
        req(err);
      }
      res(result);
    });
  });
};

const createCliente = () => {
  return new Promise((req, res) => {
    pool.query(
      "INSERT INTO cliente (nombre, puntos) VALUES ($1, $2) RETURNING *",
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

const deleteCliente = (id) => {
  return new Promise((req, res) => {
    pool.query("DELETE FROM cliente WHERE id = $1", [id], (err, result) => {
      if (err) {
        req(err);
      }
      res(result);
    });
  });
};

const updateCliente = (id) => {
  return new Promise((req, res) => {
    pool.query(
      "UPDATE cliente SET nombre = $1, puntos = $2 WHERE id = $3 RETURNING*",
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
  getClientes,
  createCliente,
  getClientesById,
  deleteCliente,
  updateCliente,
};
