const { Pool } = require("pg");
const { db } = require("./config");

const pool = new Pool({
  host: db.host,
  user: db.user,
  port: db.port,
  password: db.password,
  database: db.database,
});

module.exports = pool;
