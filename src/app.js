const express = require("express")
const userRoutes = require("./routers/userRoutes")
const session = require('express-session')
require("./db/mongoose.js")

const app = express()
const port = process.env.PORT | 3000

app.use(session({
  secret: 'ayushgyiaknahjqj',
  resave: false,
  saveUninitialized: true
}))

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/users", userRoutes)

app.get("", async (req, res) => {
  res.render("home")
})

app.listen(port, () => {
  console.log("Server is running on port", port)
})