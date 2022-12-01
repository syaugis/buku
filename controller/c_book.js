const Book = require('./../model/m_book');
const env = require('dotenv');
const {res_error, res_success} = require('./../response/response')
env.config();

const getAllBook = async (req, res) => {
    try {
        const uri = req.query.judul
        if(uri != undefined){
            await Book.find({$text:{$search:uri}}, (err, result) => {
                if(err) return res_error(res, 400, "400 Bad Request", "Request error by client so that it cannot get all Book")
                
                return res_success(res, 200, "200 OK", "Get all data Book", result)
            }).clone().catch(err => console.log(err))
        } else{
            await Book.find({}, (err, result) => {
                if(err) return res_error(res, 400, "400 Bad Request", "Request error by client so that it cannot get all Book")
                
                return res_success(res, 200, "200 OK", "Get all data Book", result)
            }).clone().catch(err => console.log(err))
        }
    } catch (error) {
        if(error) return res_error(res, 500, "500 Internal Server Error",error.message)
    }
}

const getBookById = async (req, res) => {
    try {
        const _idBook = req.params.id;
        console.log(1)
        await Book.findOne({"_id":_idBook}, (err, result) => {
            if(err) return res_error(res, 400, "400 Bad Request", "Request error by client so that it cannot get Book by ID")
            
            return res_success(res, 200, "200 OK", "Get data Book by id", result)
        }).clone().catch(err => console.log(err))
    } catch (error) {
        if(error) return res_error(res, 500, "500 Internal Server Error",error.message)
    }
}

const changeBookById = async (req, res) => {
    try {
        const _idCountry = req.params.id;
        const data = req.body;

        // if(req.user.user.role != process.env.ADMIN || req.user.user.role == null) res_error(res, 403, "403 Forbidden", "Unauthenticated error and incorrect address so can't change the country by id (Admin)");

        await Book.updateOne({"_id":_idCountry}, {$set:data}, (err, result) => {
            if(err) return res_error(res, 400, "400 Bad Request", "Request error by client so that it cannot change Book by ID")

            return res_success(res, 200, "200 OK", "You was change a Book by id")
        }).clone().catch(err => console.log(err))
    } catch (error) {
        if(error) return res_error(res, 500, "500 Internal Server Error",error.message)
    }
}

const storeBook = async (req, res) => {
    try {
        const data = req.body;
        // if(req.user.user.role != process.env.ADMIN || req.user.user.role == null) return res_error(res, 403, "403 Forbidden", "Unauthenticated error and incorrect address so can't store the country (Admin)");
        await Book.create(
            data
        , (err, result) => {
            if(err) return res_error(res, 400, "400 Bad Request", "Request error by client so that it cannot store Book")

            return res_success(res, 201, "201 Created", "You was listed a Book")
        })
    } catch (error) {
        if(error) return res_error(res, 500, "500 Internal Server Error",error.message)
    }
}

const deleteBookById = async (req, res) => {
    try {
        let _idBook = req.params.id;

        // if(req.user.user.role != process.env.ADMIN || req.user.user.role == null) res_error(res, 403, "403 Forbidden", "Unauthenticated error and incorrect address so can't delete country by id (Admin)");

        await Book.deleteOne({_id:_idBook}, (err, result) => {
            if(err) return res_error(res, 400, "400 Bad Request", "Request error by client so that it cannot delete Book by ID")

            return res_success(res, 200, "200 OK", "You was deleted a Book")
        }).clone().catch(err => console.log(err))
    } catch (error) {
        if(error){
            if(error) return res_error(res, 500, "500 Internal Server Error",error.message)
        }
    }
}

module.exports = {getAllBook, getBookById, changeBookById, storeBook, deleteBookById}