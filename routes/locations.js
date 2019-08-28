const express = require('express');
const router = express.Router();
const Location = require('../database/models/Location');

// Get All Locations
router.get('/', (req, res) => {
    Location.all()
        .then(rows => res.json(rows))
        .catch(err => res.json(err));
});

// Get Only One Location
router.get('/:id', (req, res) => {
    let { id } = req.params;
    Location.find(id)
        .then(rows => res.json(rows))
        .catch(err => res.json(err));
});

module.exports = router;