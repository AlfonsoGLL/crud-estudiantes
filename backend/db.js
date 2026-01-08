const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'hola123',
  database: 'estudiantes_db'
});

module.exports = pool.promise();
