const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var userSchema = new Schema({
    username: {
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }, 

    firstName: {
        type: String
    }, 
    lastName: {
        type: String
    }, 
    country: {
        type: String, 
        required: true
    }
})

const User = mongoose.model("User", userSchema);


module.exports = {
    User
}