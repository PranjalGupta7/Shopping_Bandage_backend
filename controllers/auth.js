const pool = require("../models/Db");
const bcrypt = require('bcrypt');
const {validateEmail, isEmpty} = require('../helpers/Validation');
const authQuery = require('../models/User');
const jwt = require("jsonwebtoken")

const registration = async (req,res) => {
    let {username, email, password} = req.body;

    if(isEmpty(username) || isEmpty(email) || isEmpty(password)) {
        res.status(401).json({
            "message": 'Feilds cannot be left empty'
        });
    }
    if(validateEmail(email)){
        res.status(401).json({
            "message": 'Enter valid email address'
        })
    }

    await authQuery.registerUserInDb(email,username,password)
        .catch(err => {
            res.status(401).json({
                "message": "Some error occured"
            })
        })
        
    return res.json({"status": "Success"})
}

const login = async (req,res) => {
    let {email, password} = req.body;
    let responseFromDb = await authQuery.verifyUserInDb(email, password)
    if(responseFromDb){
        let token = process.env.JWT_SECRET_KEY
        let data = {
            "time": Date(),
            "userId": responseFromDb[0].userid
        }
        return res.json({
            status: "Success",
            token: jwt.sign(data, token),
            userId: responseFromDb[0].userid,
            username: responseFromDb[0].username,
            email: responseFromDb[0].email
        })
    }
    else{
        res.status(401).send({
            status: "User not Found"
        })
    }
}

const token = async(req, res) => {
    const {token} = req.body
    let verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if(verified)
        return res.json({status: "Success"})
    else
        return res.sendStatus(401)
}

module.exports = {
    registration, login, token
};