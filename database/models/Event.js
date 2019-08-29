const db = require('../mysql');

function all() {
    return new Promise((resolve, reject) => {
        db.get().query("SELECT * FROM events", (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

function find(id) {
    return new Promise((resolve, reject) => {
        db.get().query("SELECT * FROM events WHERE id=?", [ id ], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = {
    all: all,
    find: find
};