const express = require("express")
const userRouter = require("./routers/user")
require("./db/mongoose.js")

const app = express()
const port = process.env.PORT | 3000

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(userRouter)

app.listen(port, () => {
  console.log("Server is running on port",port)
});