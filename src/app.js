const express = require("express")
const userRoutes = require("./routers/userRoutes")
require("./db/mongoose.js")

const app = express()
const port = process.env.PORT | 3000

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes)

app.get("", async (req, res) => {
  res.render("home")
})

app.listen(port, () => {
  console.log("Server is running on port", port)
})