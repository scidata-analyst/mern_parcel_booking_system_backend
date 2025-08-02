const mongose = require("mongoose");
const Schema = mongose.Schema;  

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongose.model("user", userSchema);
module.exports = User