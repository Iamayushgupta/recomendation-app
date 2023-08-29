const User = require("../models/user.js")
const bcrypt = require('bcrypt')
const { sendEmail, generateOTP } = require("../utils/helpers");
const conn = require("../db/mysql.js")

exports.loginUser = async (req, res) => {
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
            const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDatabase)

            if (passwordMatch) {
                res.sendStatus(200)
            } else {
                res.sendStatus(500)
            }
        }
    })
}

const otpDB = new Map()
exports.signUpUser = async (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(8)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const query = 'insert into users(email, password) values(?,?)'
    conn.query(query, [email, hashedPassword], (err, results) => {
        if (err) {
            res.sendStatus(500)
        }
        else {
            const otp = generateOTP()
            otpDB.set(email, otp)
            sendEmail(email, otp)
            res.sendStatus(200)
        }
    })
}

exports.verifyUserOTP = async (req, res) => {
    const { email,otp } = req.body
    if (otpDB.has(email) && otpDB.get(email) == otp) {
        res.sendStatus(200)
    } else {
        res.sendStatus(500)
    }
}

exports.registerUser = async(req,res)=>{
    const { name, city, restaurant, favoriteDish } = req.body
    const user = new User({ name, city, restaurant, favoriteDish })
    try {
        await user.save()
        res.sendStatus(200)
    }
    catch (e) {
        res.sendStatus(500)
    }
}

exports.searchUser = async (req,res)=>{
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

        res.render('search', { restaurants })
    } catch (err) {
        console.log(err)
    }
}

exports.editUser = async(req,res) =>{
    const { id, name, city, restaurant, favoriteDish } = req.body 
    try {
        await User.findByIdAndUpdate(id, { name, city, restaurant, favoriteDish }, { new: true, upsert: true })
        res.sendStatus(200)
    }
    catch (e) {
        res.sendStatus(500)
    }
}