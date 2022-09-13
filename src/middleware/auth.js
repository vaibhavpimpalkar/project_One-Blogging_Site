const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");
const mongoose = require('mongoose')

// ________________________________MIDDLEWARE FOR AUTHENTICATION_________________________________

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["X-Api-Key"];

        //If no token is present in the request header return error. This means the user is not logged in.
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, "Project1-Group45");
        if (!decodedToken) {
            return res.status(401).send({ status: false, msg: "token is invalid" });
        }

        req.loggedInAuthorId = decodedToken._id

        next()
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

// ________________________________MIDDLEWARE FOR AUTHORIZATION_________________________________

const authorization = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]; 
        token = req.headers["x-api-key"];
        let decodedToken = jwt.verify(token, "Project1-Group45"); //verify token with secret key 
        let loginInUser = decodedToken.authorId; //log in by token
        let blogId = req.params.blogId
        
        let checkBlogId = await blogModel.findById({ _id: blogId })
        if (!checkBlogId)
        return res.status(404).send({ status: false, msg: "No blog exists, Enter a valid Object Id" });
        
        if (checkBlogId.authorId != loginInUser) {
            return res.status(403).send({ status: false, msg: "Authorization failed" })
        }
        next(); //if auther is same then go to your page

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }

}

module.exports = { authentication, authorization }