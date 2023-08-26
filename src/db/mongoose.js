const mongoose = require('mongoose')
mongoose.connect(process.env.LOCAL_MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// /Users/ayushgupta/Documents/mongodb/bin/mongod --dbpath=/Users/ayushgupta/Documents/mongodb-data 