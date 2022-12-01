const User = require('./../model/m_user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('dotenv');
const {res_error, res_success} = require('./../response/response')
env.config();

const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({ username }).lean();

        if(!user)  res_error(res, 400, "400 Bad Request", "Your username or password is invalid")

        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign({user},process.env.JWT)
            
            return res_success(res, 200, "200 OK", "You was login", token)
        }

        return res_error(res, 400, "400 Bad Request", "Your username or password is invalid")
    } catch (error) {
        if(error) res_error(res, 500, "500 Internal Server Error", error.message)
    }
}

const register = async (req, res) => {
    try {
        const {username, email, password:textPass} = req.body
        if(textPass.length > 7){
            const password = await bcrypt.hash(textPass, 10);
            await User.create({username, email, password}, (err, result) => {
                if(err) return res_error(res, 400, "400 Bad Request", err.message)
                
                return res_success(res, 201, "201 Created", "Your Account was registered")
            })
        }
        else{
            return res_error(res, 400, "400 Bad Request", "Minimum password characters are 8")
        }
    } catch (error) {
        if(error) return res_error(res, 500, "500 Internal Server Error",error.message)
    }
}

module.exports = {login, register}