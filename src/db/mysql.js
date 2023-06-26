const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : "ayushsql",
  database : "restaurantDB"
})

module.exports = conn