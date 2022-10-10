const mongoose = require("mongoose");
const Schema = mongoose.Schema;



//Create schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;