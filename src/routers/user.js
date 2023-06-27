const express = require("express")
const router = new express.Router()
const User = require("../models/user.js")
const path = require("path")
const conn = require("../db/mysql.js")
const bcrypt = require('bcrypt')
const { AsyncLocalStorage } = require("async_hooks")

router.post('/users/me', async (req, res) => {
    const { name, city, restaurant, favoriteDish } = req.body
    const user = new User({ name, city, restaurant, favoriteDish })
    try {
        await user.save()
        res.sendStatus(200)
    }
    catch (e) {
        res.sendStatus(500)
    }
})

router.get('/users/me', (req, res) => {
    const newPath = path.join(__dirname, "../../views/index.html")
    res.sendFile(newPath)
})

const salt = bcrypt.genSaltSync(8)

router.post("/users/login", async (req, res) => {
    const { email, password } = req.body
    const query = 'SELECT password FROM users WHERE email = ?'
    conn.query(query, [email, password], async(err, results) => {
        if (err) {
            res.sendStatus(500)
        }
        else if (results.length == 0) {
            res.sendStatus(500)
        } else {
            const hashedPasswordFromDatabase = results[0].password;
            const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDatabase);

            if (passwordMatch) {
                res.sendStatus(200)
            } else {
                res.sendStatus(500)
            }
        }
    })
})


router.get("/users/login", async (req, res) => {
    const newPath = path.join(__dirname, "../../views/login.html")
    res.sendFile(newPath)
})


router.post("/users/signup", async (req, res) => {
    const { email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, salt)
    const query = 'insert into users(email, password) values(?,?)'
    conn.query(query, [email, hashedPassword], (err, results) => {
        if (err) {
            res.sendStatus(500)
        }
        else {
            res.sendStatus(200)
        }
    })
})

router.get("/users/signup", async (req, res) => {
    const newPath = path.join(__dirname, "../../views/signup.html")
    res.sendFile(newPath)
})

router.get("/users/home", async (req,res)=>{
    const newPath = path.join(__dirname, "../../views/home.html")
    res.sendFile(newPath)
})
module.exports = router