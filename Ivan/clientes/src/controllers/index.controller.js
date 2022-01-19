const {
  Pool
} = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "1234",
  database: "clientes",
});

const getClientes = async (req, res) => {
  const result = await pool.query("SELECT * FROM clientes");
  res.status(200).json(result.rows);
};

const getClientesById = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("SELECT * FROM clientes WHERE id = $1", [id]);
  res.json(response.rows)
}

const createCliente = async (req, res) => {
  const {
    nombre,
    points
  } = req.body;
  try {
    const response = await pool.query("INSERT INTO clientes (nombre, points) VALUES ($1, $2) RETURNING *", [nombre, points]);
    res.json(response.rows[0]);
  } catch (error) {
    res.json({
      error: error.message
    });
  }
};


const deleteCliente = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("DELETE FROM clientes WHERE id = $1", [id]);
  console.log(response);
  res.json(`Cliente ${id} eliminado`);

};

const updateCliente = async (req, res) => {
  const id = req.params.id;
  const {
    nombre
  } = req.body;
  const response = await pool.query("UPDATE clientes SET nombre = $1 WHERE id = $2", [nombre, id]);

  console.log(response);
  res.json('cliente actualizado');
}


module.exports = {
  getClientes,
  createCliente,
  getClientesById,
  deleteCliente,
  updateCliente
};