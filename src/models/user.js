const mongoose = require("mongoose")

// Define the user schema using Mongoose's Schema class
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    restaurant: {
        type: String,
        trim: true,
        required: true
    },
    favoriteDish: {
        type: String,
        trim: true
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create a User model based on the defined schema
const User = mongoose.model("User", userSchema)

// Log when the User model is created
console.log("User model created.")

// Export the User model for use in other modules
module.exports = User