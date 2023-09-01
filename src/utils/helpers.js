const nodemailer = require("nodemailer")
const crypto = require('crypto')

exports.generateOTP = () => {
   return crypto.randomInt(100000, 999999).toString()
}

exports.sendEmail = (to, otp) => {
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: process.env.EMAIL,
         pass: process.env.PASSWORD,
      }
   })
   const mailOptions = {
      from: 'ayushgupta71011@gmail.com',
      to: to,
      subject: 'Your OTP for Signup',
      text: `Your OTP is: ${otp}`
   }

   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         console.error("Error sending email:", error)
      } 
   })
}
