const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minLength:[6, "Minimal 6 karakter"]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;