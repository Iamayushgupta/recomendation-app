const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/restaurantDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// /Users/ayushgupta/Documents/mongodb/bin/mongod --dbpath=/Users/ayushgupta/Documents/mongodb-data 