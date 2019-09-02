const express = require('express');
const router = express.Router();
const Event = require('../database/models/User');

// Get All Events
router.post('/register', (req, res) => {
    Event.register()
        .then(rows => res.json(rows))
        .catch(err => res.json(err));
});


module.exports = router;