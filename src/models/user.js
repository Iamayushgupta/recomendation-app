const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    city : {
        type : String,
        trim : true,
        required : true
    },
    restaurant : {
        type : String,
        trim : true,
        required : true
    },
    favoriteDish : {
        type : String,
        trim : true
    }
},{
    timestamps : true
})

const User = mongoose.model("User" , userSchema)
module.exports = User