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
    },
},{
    timestamps : true
});

// userSchema.methods.generateAuthToken = async function(){
//     const user =this 
//     const token = jwt.sign({_id : user._id.toString()} , process.env.JWT_SECRET)
//     user.tokens = user.tokens.concat({token})
//     await user.save()
//     return token
// }

const User = mongoose.model("User" , userSchema)
module.exports = User