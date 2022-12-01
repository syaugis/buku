const User = require('./../model/m_user');
const env = require('dotenv');
const bcrypt = require('bcryptjs');
const {res_error, res_success} = require('./../response/response')
env.config();

const profileUser = async (req, res) => {
    try {
        const _idUser = req.user.user._id
        await User.findOne({"_id":_idUser}, (err, result) => {
            if(err) return res_error(res, 400, "400 Bad Request", "Request error by client so that it cannot get profile")

            return res_success(res, 200, "200 OK", "Your data was checked", result)
        }).clone().catch(err => console.log(err))
        
    } catch (error) {
        if(error) return res_error(res, 500, "500 Internal Server Error",error.message)
    }
}

const changeProfile = async (req, res) => {
    try {
        const {new_password:textPass} = req.body;
        const new_password = await bcrypt.hash(textPass, 10);
        const _idUser = req.user.user._id
        await User.updateOne({"_id":_idUser}, 
        {$set:{"password":new_password}}, (err, result) => {
            if(err) return res_error(res, 400, "400 Bad Request", "Request error by client so that it cannot change profile")

            return res_success(res, 200, "200 OK", "Your profile was changed")
        }).clone().catch(err => console.log(err))
    } catch (error) {
        if(error) return res_error(res, 500, "500 Internal Server Error",error.message)
    }  
}

module.exports = {profileUser, changeProfile}