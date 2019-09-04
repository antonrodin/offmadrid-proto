const db = require('../mysql');
const moment = require('moment');

function insert({ email, password }) {
    return new Promise((resolve, reject) => {
        db.get().query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

function createToken(user_id) {
    const payload = {
        userId: user_id,
        createdAt: moment().unix(),
        expiresAt: moment().add(30, 'seconds').unix()
    }
    return jwt.encode(payload, process.env.SECRET_KEY);
}

module.exports = {
    insert: insert
};