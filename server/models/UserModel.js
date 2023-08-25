const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserType = {
    username: String,
    password: String,
    //use 0,1,2 represent the gender
    gender: Number,
    introduction: String,
    avatar: String,
    //administrator:1, editor:2
    role: Number
}
const UserModel = mongoose.model("user", new Schema(UserType))

module.exports = UserModel