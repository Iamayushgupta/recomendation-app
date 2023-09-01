const nodemailer = require("nodemailer")
const crypto = require('crypto')

// Function to generate a random OTP
exports.generateOTP = () => {
   return crypto.randomInt(100000, 999999).toString()
}

// Function to send an email with OTP
exports.sendEmail = (to, otp) => {
   // Create a transporter for sending emails
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: process.env.EMAIL,      // Sender's email from environment
         pass: process.env.PASSWORD    // Sender's email password from environment
      }
   })

   // Configure email content
   const mailOptions = {
      from: 'ayushgupta71011@gmail.com', // Sender's email
      to: to,                             // Recipient's email
      subject: 'Your OTP for Signup',     // Email subject
      text: `Your OTP is: ${otp}`          // Email body with OTP
   }

   // Send the email
   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         console.error("Error sending email:", error)
      } else {
         console.log("Email sent:", info.response)
      }
   })
}