const mysql = require('mysql2')

// Create a connection to the MySQL database using provided credentials
const conn = mysql.createConnection({
  host: process.env.LOCAL_SQLDB_HOST,        // MySQL server host
  user: process.env.LOCAL_SQLDB_USER,             // MySQL user
  password: process.env.LOCAL_SQLDB_PASSWORD,     // MySQL user's password
  database: 'restaurantDB'  // MySQL database to connect to
});

// Uncomment the following code and update it with environment variables
// if you want to use environment-specific database credentials.
/*
const conn = mysql.createConnection({
  host: process.env.SQLDB_URL,       // MySQL server host from environment
  user: process.env.SQLDB_USER,      // MySQL user from environment
  port: 3306,                        // MySQL server port (default is 3306)
  password: process.env.SQLDB_PASSWORD, // MySQL user's password from environment
  database: 'reco_db'                // MySQL database to connect to
});
*/

// Attempt to establish a connection to the database
conn.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.message)
  } else {
    console.log('Connected to MySQL database')
  }
})

// Export the database connection object for use in other modules
module.exports = conn