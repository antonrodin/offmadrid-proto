const mysql = require('mysql');
const { database } = require('../config');

let pool = null;

function connect(done) {
    pool = mysql.createPool(database);
    done();
}

function get() {
    return pool;
}

module.exports = {
    connect: connect,
    get: get 
}