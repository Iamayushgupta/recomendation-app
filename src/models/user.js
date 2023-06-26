const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
    name: String,
    city: String,
    restaurant: String,
    favoriteDish: String,
});

userSchema.methods.generateAuthToken = async function(){
    const user =this 
    const token = jwt.sign({_id : user._id.toString()} , process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model("User" , userSchema)
module.exports = User