const mysql = require('mysql2');

// const conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password : "ayushsql",
//   database : "restaurantDB"
// })

const conn = mysql.createConnection({
  host: process.env.SQLDB_URL,
  user: process.env.SQLDB_USER,
  port : 3306,
  password : process.env.SQLDB_PASSWORD,
  database : "reco_db"
})

module.exports = conn