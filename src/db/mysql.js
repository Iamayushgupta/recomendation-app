const mysql = require('mysql2');

// const conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password : "ayushsql",
//   database : "restaurantDB"
// })

const conn = mysql.createConnection({
  host: 'database-1.ch9muvve1gk9.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  port : 3306,
  password : "ayushsql",
  database : "reco_db"
})

module.exports = conn