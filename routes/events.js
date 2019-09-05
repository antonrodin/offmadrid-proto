const express = require('express');
const router = express.Router();
const Event = require('../database/models/Event');

// Get All Events
router.get('/', (req, res) => {
    Event.all()
        .then(rows => res.json(rows))
        .catch(err => res.json(err));
});

// Get Only One Event
router.get('/:id', (req, res) => {
    let { id } = req.params;
    Event.find(id)
        .then(rows => res.json(rows))
        .catch(err => res.json(err));
});

// Insert Event
router.post('/', (req, res) => {
    Event.insert(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Update Event
router.put('/', (req, res) => {
    Event.update(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Delete Event
router.delete('/:id', (req, res) => {
    let { id } = req.params;
    Event.delete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

module.exports = router;