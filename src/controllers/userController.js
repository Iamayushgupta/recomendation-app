const User = require("../models/user.js")
const bcrypt = require('bcrypt')
const { sendEmail, generateOTP } = require("../utils/helpers")
const conn = require("../db/mysql.js")

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    const query = 'SELECT password FROM users WHERE email = ?'
    conn.query(query, [email, password], async (err, results) => {
        if (err) {
            console.error("Error during login:", err)
            res.sendStatus(500) // Internal Server Error
        } else if (results.length === 0) {
            console.log("User not found:", email)
            res.sendStatus(500) // Internal Server Error
        } else {
            const hashedPasswordFromDatabase = results[0].password
            const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDatabase)

            if (passwordMatch) {
                console.log("Login successful:", email)
                res.sendStatus(200) // OK
            } else {
                console.log("Incorrect password for:", email)
                res.sendStatus(500) // Internal Server Error
            }
        }
    })
}

exports.signUpUser = async (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(8)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const query = 'INSERT INTO users(email, password) VALUES (?, ?)'
    conn.query(query, [email, hashedPassword], (err, results) => {
        if (err) {
            console.error("Error during signup:", err)
            res.sendStatus(500) // Internal Server Error
        } else {
            const otp = generateOTP()
            req.session.OTP = otp
            req.session.email = email
            sendEmail(email, otp)
            console.log("Signup successful:", email)
            res.sendStatus(200) // OK
        }
    })
}

exports.verifyUserOTP = async (req, res) => {
    console.log("Session data:", req.session)
    const { otp } = req.body
    if (otp === req.session.OTP) {
        console.log("OTP verification successful.")
        res.sendStatus(200) // OK
    } else {
        console.log("OTP verification failed.")
        res.sendStatus(500) // Internal Server Error
    }
}

exports.registerUser = async (req, res) => {
    const { name, city, restaurant, favoriteDish } = req.body
    const user = new User({ name, city, restaurant, favoriteDish })
    try {
        await user.save()
        console.log("User registration successful:", user)
        res.sendStatus(200) // OK
    } catch (e) {
        console.error("Error during user registration:", e)
        res.sendStatus(500) // Internal Server Error
    }
}

exports.searchUser = async (req, res) => {
    try {
        const city = req.query.city
        const name = req.query.name

        if (!city) {
            var restaurants = await User.find({ name })
        } else if (!name) {
            var restaurants = await User.find({ city })
        } else {
            var restaurants = await User.find({ name, city })
        }

        console.log("Search results:", restaurants)
        res.render('search', { restaurants })
    } catch (err) {
        console.error("Error during search:", err)
    }
}

exports.editUser = async (req, res) => {
    const { id, name, city, restaurant, favoriteDish } = req.body
    try {
        await User.findByIdAndUpdate(id, { name, city, restaurant, favoriteDish }, { new: true, upsert: true })
        console.log("User information updated:", id)
        res.sendStatus(200) // OK
    } catch (e) {
        console.error("Error during user information update:", e)
        res.sendStatus(500) // Internal Server Error
    }
}

exports.resendOTP = async (req, res) => {
    const otp = generateOTP()
    req.session.OTP = otp
    sendEmail(req.session.email, otp)
    console.log("OTP resent:", req.session.email)
    res.sendStatus(200) // OK
}