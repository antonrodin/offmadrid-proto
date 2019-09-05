const jwt = require('jwt-simple');
const moment = require('moment');
const User = require('../database/models/User');

function checkAuth(req, res, next) {
    
    // If no token
    if(!req.headers['authentication']) {
        return res.json({ err: "Auth dice: El token no existe, tienes que loguearte" });
    }

    let token = req.headers['authentication'];
    let payload = null;

    try {
        payload = jwt.decode(token, process.env.SECRET_KEY);
    } catch(err) {
        return res.json({ err: "Auth dice: Hay algun tipo de problema para decodificar el token" });
    }

    // Find if user still exists and check if token is expired
    User.getUserById(payload.userId)
        .then(user => {
            
            if(!user) res.json({ err: 'El usuario no existe' });

            // Check Expires
            if (payload.expiresAt < moment().unix()) {
                return res.json({ error: 'Auth dice: Existe un error con el token. Está caducado' })
            }

            // ¡Weeeee! Next request
            next();
        })
        .catch(err => {
            res.json({ err: 'Auth dice: Se ha producido error al buscar el usuario' });
        });
}

module.exports = {
    auth: checkAuth
}