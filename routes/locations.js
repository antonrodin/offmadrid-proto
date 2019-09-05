const express = require('express');
const router = express.Router();
const Location = require('../database/models/Location');
const { auth } = require('../middlewares/auth');

// Get all Locations
router.get('/', (req, res) => {
    Location.all()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Get Location
router.get('/:id', (req, res) => {
    let { id } = req.params;
    Location.find(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Insert Location
router.post('/', auth, (req, res) => {
    Location.insert(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Update Location
router.put('/', auth, (req, res) => {
    Location.update(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Delete Location
router.delete('/:id', auth, (req, res) => {
    let { id } = req.params;
    Location.delete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

module.exports = router;