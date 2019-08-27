const express = require('express');
const router = express.Router();
const connection = require('../database/mysql');

// Get All Locations
router.get('/', (req, res) => {
    connection.query("SELECT * FROM locations", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

// Get Only One Location
router.get('/:id', (req, res) => {
    let { id } = req.params;
    connection.query(`SELECT * FROM locations WHERE id=${id}`, function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

module.exports = router;