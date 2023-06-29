const express = require("express")
const router = new express.Router()
const User = require("../models/user.js")
const path = require("path")
const conn = require("../db/mysql.js")
const bcrypt = require('bcrypt')

//Home Page
router.get("", async (req, res) => {
    res.render("home")
})

//Submit Data Route
router.post('/users/submit', async (req, res) => {
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

router.get('/users/submit', (req, res) => {
    res.render("form")
})

//Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const query = 'SELECT password FROM users WHERE email = ?'
    conn.query(query, [email, password], async (err, results) => {
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

router.get("/login", async (req, res) => {
    res.render("login")
})

//SignUp Route
router.post("/signup", async (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(8)
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

router.get("/signup", async (req, res) => {
    res.render("signup")
})

// Search By City
router.get("/users", async (req, res) => {
    try {
        const city = req.query.city
        const restaurants = await User.find({city})
        res.render('searchByCity', { restaurants })
    } catch (err) {
        console.log(err)
    }
})

//Search By Name
router.get("/users", async (req, res) => {
    try {
        const username = req.query.name
        const restaurants = await User.find({ name: username })
        console.log(restaurants)
        res.render('searchByCity', { restaurants })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router