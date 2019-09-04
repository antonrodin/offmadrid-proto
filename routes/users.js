const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const bcrypt = require('bcrypt');

// Register User
router.post('/register', (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    User.insert(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

module.exports = router;