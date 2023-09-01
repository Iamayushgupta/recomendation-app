const express = require("express")
const userRoutes = require("./routers/userRoutes")
const session = require('express-session')
require("./db/mongoose.js") // Connect to the database

const app = express()
const port = process.env.PORT || 3000

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Secret used to sign the session ID cookie
  resave: false,              // Do not resave session if it's not modified
  saveUninitialized: true     // Save uninitialized sessions
}))

app.set('view engine', 'ejs') // Set the view engine to EJS
app.use(express.json())       // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded request bodies
app.use("/users", userRoutes)  // Use userRoutes for paths starting with /users

// Define a route for the home page
app.get("", async (req, res) => {
  res.render("home") // Render the "home" view
})

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log("Server is running on port", port)
})