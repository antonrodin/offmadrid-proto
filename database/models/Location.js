const db = require('../mysql');

function all() {
    return new Promise((resolve, reject) => {
        db.get().query("SELECT * FROM locations", (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function find(id) {
    return new Promise((resolve, reject) => {
        db.get().query("SELECT * FROM locations WHERE id=?", [ id ], (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
}

function insert({user_id, name, image, description, type, cp, address, lat, lng, url, capacity, phone, email}) {
    return new Promise((resolve, reject) => {
        
        let sql = "INSERT INTO locations (user_id, name, image, description, type, city, cp, address, lat, lng, url, capacity, phone, email, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        db.get().query(sql, [user_id, name, image, description, type, "Madrid", cp, address, lat, lng, url, capacity, phone, email, new Date(), new Date()], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });

    });
}

function update({id, name, image, description, type, cp, address, lat, lng, url, capacity, phone, email}) {
    return new Promise((resolve, reject) => {
        
        let sql = "UPDATE locations SET user_id = ?, name = ?, image = ?, description = ?, type = ?, city = ?, cp = ?, address = ?, lat = ?, lng = ?, url = ?, capacity = ?, phone = ?, email = ?, updated_at = ? WHERE id = ?";

        db.get().query(sql, [1, name, image, description, type, "Madrid", cp, address, lat, lng, url, capacity, phone, email, new Date(), id], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });

    });
}

function destroy(id) {
    return new Promise((resolve, reject) => {
        let sql = "DELETE FROM locations WHERE id = ?";
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