const express = require('express');
const router = express.Router();
const Event = require('../database/models/Event');

// Get All Locations
router.get('/', (req, res) => {
    Event.all()
        .then(rows => res.json(rows))
        .catch(err => res.json(err));
});

// Get Only One Location
router.get('/:id', (req, res) => {
    let { id } = req.params;
    Event.find(id)
        .then(rows => res.json(rows))
        .catch(err => res.json(err));
});

module.exports = router;