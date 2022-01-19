const pool = require("../clientesbd")


const getClientes = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM clientes");
    res.json(response.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const getClientesById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query("SELECT * FROM clientes WHERE id = $1", [
      id,
    ]);
    if (response.rows.length === 0)
      return res.status(404).json({
        message: "cliente no encontrado",
      });
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

const createCliente = async (req, res) => {
  const { nombre, points } = req.body;
  try {
    const response = await pool.query(
      "INSERT INTO clientes (nombre, points) VALUES ($1, $2) RETURNING *",
      [nombre, points]
    );
    res.json(response.rows[0]);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

const deleteCliente = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("DELETE FROM clientes WHERE id = $1", [id]);

  if (response.rowsCount === 0)
    return res.status(404).json({
      message: "Cliente no encontrado",
    });
  return res.sendStatus(204);
};

const updateCliente = async (req, res) => {
  const id = req.params.id;
  const { nombre, points } = req.body;
  const response = await pool.query(
    "UPDATE clientes SET nombre = $1, points = $2 WHERE id = $3 RETURNING*",
    [nombre, points, id]
  );
  if (response.rows.length === 0)
    return res.status(404).json({
      message: "Cliente no encontrado",
    });

  return res.json(response.rows[0]);
};

module.exports = {
  getClientes,
  createCliente,
  getClientesById,
  deleteCliente,
  updateCliente,
};
