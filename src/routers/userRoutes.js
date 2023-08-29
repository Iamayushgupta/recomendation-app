const express = require("express")
const router = new express.Router()
const { loginUser, signUpUser, verifyUserOTP, registerUser, searchUser, editUser } = require("../controllers/userController");

router.post("/login",loginUser)
router.get("/login", async(req,res)=>{
    res.render("login")
})

router.post("/signUp",signUpUser)
router.get("/signUp", async(req,res)=>{
    res.render("signup")
})

router.post("/verify",verifyUserOTP)
router.get("/verify", async(req,res)=>{
    res.render("verify")
})

router.post("/register",registerUser)
router.get("/register", async(req,res)=>{
    res.render("register")
})

router.get("/search", searchUser)

router.post("/edit", editUser)
router.get("/edit", async (req, res) => {
    res.render("update")
})

module.exports = router