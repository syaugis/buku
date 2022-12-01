const env = require('dotenv');
const jwt = require('jsonwebtoken');
env.config();
const {res_error} = require('./../response/response')

const checkJWT = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const token = auth.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT);
        req.user = user;
        if(!user || user == null) res_error(res, 403, "403 Forbidden", "You haven't been authenticated and authorized")
        next()
    } catch (error) {
        if(error) res_error(res, 500, "500 Internal Server Error", "There is an error from the server side")
    }
}

module.exports = {checkJWT}