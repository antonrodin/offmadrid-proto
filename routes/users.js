const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const bcrypt = require('bcrypt');

// Find User
// Get Only One Event
router.get('/:id', (req, res) => {
    let { id } = req.params;
    User.find(id)
        .then(rows => res.json(rows))
        .catch(err => res.json(err));
});

// Register User
router.post('/register', (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    User.insert(req.body)
        .then(result => {
            let token = User.createToken(result.insertId);
            res.json({ token: token });
        })
        .catch(err => res.json(err));
});

router.post('/login', (req, res) => {
    User.getUserByEmail(req.body.email)
        .then(user => {

            // If user == null
            if(!user) res.json({ err: "El email no existe en la base de datos" });

            // Check user & password
            bcrypt.compare(req.body.password, user.password, (err, same) => {
                if(err) res.json({ err: "Se ha producido un error sin identificar"});
                if(!same) res.json({ err: "El email y la contraseña no coinciden" });
                
                // If no errors return new token
                res.json({ token: User.createToken(user.id) });
            });

        })
        .catch(err => {
            res.json(err);
        })
});

module.exports = router;