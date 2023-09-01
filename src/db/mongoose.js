const mongoose = require('mongoose')

// Connect to the MongoDB database using the provided URL
mongoose.connect(process.env.LOCAL_MONGODB_URL, {
  useNewUrlParser: true,         // Use new URL parser
  useUnifiedTopology: true,    // Use new server discovery and monitoring engine
})

// Log when the connection to the database is established
const db = mongoose.connection
db.on('error', (error) => {
  console.error('MongoDB connection error:', error)
})
db.once('open', () => {
  console.log('Connected to MongoDB database')
})

// To start MongoDB server, you can use the following command in the terminal:
// /Users/ayushgupta/Documents/mongodb/bin/mongod --dbpath=/Users/ayushgupta/Documents/mongodb-data