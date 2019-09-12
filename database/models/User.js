const db = require('../mysql');
const moment = require('moment');
const jwt = require('jwt-simple');

/**
 * Insert User to Database
 * @param {String} email User email 
 * @param {String} password User Password 
 */
function insert({ email, password }) {
    return new Promise((resolve, reject) => {
        db.get().query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        db.get().query('SELECT * FROM `users` WHERE `email` = ? LIMIT 1', [email], (err, rows) => {
            if (err) reject(err);
            if (rows.lenght == 0) resolve(null);
            resolve(rows[0]);
        });
    });
}

function find(id) {
    return new Promise((resolve, reject) => {
        db.get().query("SELECT * FROM users WHERE id=?", [ id ], (err, rows) => {
            if (err) reject(err);
            resolve(rows[0]);
        });
    });
}

function findLocationsByUser(id) {
    return new Promise((resolve, reject) => {
        db.get().query("SELECT * FROM locations WHERE user_id=?", [ id ], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

function getUserById(id) {
    return new Promise((resolve, reject) => {
        db.get().query('SELECT * FROM `users` WHERE `id` = ? LIMIT 1', [id], (err, rows) => {
            if (err) reject(err);
            if (rows.lenght == 0) resolve(null);
            resolve(rows[0]);
        });
    });
}

/**
 * Create Token for Auth login
 * @param {Integer} user_id User ID
 */
function createToken(user_id) {
    const payload = {
        userId: user_id,
        createdAt: moment().unix(),
        expiresAt: moment().add(30, 'seconds').unix()
    }
    return jwt.encode(payload, process.env.SECRET_KEY);
}

module.exports = {
    insert: insert,
    find: find,
    findLocationsByUser: findLocationsByUser,
    getUserByEmail: getUserByEmail,
    getUserById: getUserById,
    createToken: createToken,
};