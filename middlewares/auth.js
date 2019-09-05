const jwt = require('jwt-simple');
const moment = require('moment');
const User = require('../database/models/User');

function checkAuth(req, res, next) {
    
    if(!req['authentication']) {
        return res.json({ err: "El token no existe" });
    }

    next();
}

module.exports = {
    checkAuth: checkAuth
}