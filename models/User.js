const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
});

const User = mongoose.model("User", userSchema);
module.exports = User;