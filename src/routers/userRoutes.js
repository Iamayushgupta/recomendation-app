const express = require("express")
const router = new express.Router()
const { loginUser, signUpUser, verifyUserOTP, registerUser, searchUser, editUser, resendOTP } = require("../controllers/userController")

// Route for user login
router.post("/login", loginUser)
router.get("/login", async (req, res) => {
    res.render("login")
})

// Route for user sign-up
router.post("/signUp", signUpUser)
router.get("/signUp", async (req, res) => {
    res.render("signup")
})

// Route for verifying user OTP
router.post("/verify", verifyUserOTP)
router.get("/verify", async (req, res) => {
    res.render("verify")
})

// Route for registering a user
router.post("/register", registerUser)
router.get("/register", async (req, res) => {
    res.render("register")
})

// Route for searching users
router.get("/search", searchUser)

// Route for editing user information
router.post("/edit", editUser)
router.get("/edit", async (req, res) => {
    res.render("update")
})

// Route for resending OTP
router.post("/resend", resendOTP)

module.exports = router