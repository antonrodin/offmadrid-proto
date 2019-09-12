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
            resolve(rows[0]);
        });
    });
}

function insert({location_id, name, type, start_date, end_date, image, description, price}) {
    return new Promise((resolve, reject) => {
        
        let sql = "INSERT INTO events (user_id, location_id, name, type, start_date, end_date, image, description, price, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        db.get().query(sql, [1, location_id, name, type, start_date, end_date, image, description, price, new Date(), new Date()], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });

    });
}

function update({id, location_id, name, type, start_date, end_date, image, description, price}) {
    return new Promise((resolve, reject) => {
        
        let sql = "UPDATE events SET user_id = ?, location_id = ?, name = ?, type = ?, start_date = ?, end_date = ?, image = ?, description = ?, price = ? WHERE id = ?";

        db.get().query(sql, [1, location_id, name, type, start_date, end_date, image, description, price, id], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });

    });
}

function destroy(id) {
    return new Promise((resolve, reject) => {
        let sql = "DELETE FROM events WHERE id = ?";
        db.get().query(sql, [id], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    all: all,
    find: find,
    insert: insert,
    update: update,
    delete: destroy
};