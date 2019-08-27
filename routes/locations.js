const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('All Locations');
});

router.get('/:id', (req, res) => {
    res.send('Send only one location');
});

module.exports = router;