const express = require("express")
const router = new express.Router()
const User = require("../models/user.js")
const conn = require("../db/mysql.js")
const bcrypt = require('bcrypt')
const speakeasy = require('speakeasy')
const nodemailer = require("nodemailer")
// const accountSid = process.env.TWILIO_ACCOUNT_SID
// const authToken = process.env.TWILIO_ACCOUNT_AUTH_TOKEN
// const verifySid = process.env.TWILIO_ACCOUNT_VERIFY_SID
// const client = require("twilio")(accountSid, authToken)

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
            const hashedPasswordFromDatabase = results[0].password 
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
const otpDB = new Map() 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
})
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
            const otp = Math.floor(100000 + Math.random() * 900000)
            otpDB.set(email, otp)
            const mailOptions = {
                from: 'ayushgupta71011@gmail.com',
                to: email,
                subject: 'Your OTP for Signup',
                text: `Your OTP is: ${otp}`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
            res.sendStatus(200)
        }
    })
})

router.get("/signup", async (req, res) => {
    res.render("signup")
})

//Verify OTP route
router.post("/verifyOTP", async (req, res) => {
    const { email,otp } = req.body
    if (otpDB.has(email) && otpDB.get(email) == otp) {
        res.sendStatus(200)
    } else {
        res.sendStatus(500)
    }
})

router.get("/verifyOTP", async (req, res) => {
    res.render("verifyOTP")
})

// Search By City
router.get("/users/search", async (req, res) => {
    try {
        const city = req.query.city
        const name = req.query.name

        if (!city) {
            var restaurants = await User.find({ name })
        }
        else if (!name) {
            var restaurants = await User.find({ city })
        }
        else {
            var restaurants = await User.find({ name, city })
        }

        res.render('searchBy', { restaurants })
    } catch (err) {
        console.log(err)
    }
})

router.post("/users/edit", async (req, res) => {
    const { id, name, city, restaurant, favoriteDish } = req.body 

    try {
        await User.findByIdAndUpdate(id, { name, city, restaurant, favoriteDish }, { new: true, upsert: true })
        res.sendStatus(200)
    }
    catch (e) {
        res.sendStatus(500)
    }

})

router.get("/users/edit", async (req, res) => {
    res.render("update")
})

module.exports = router