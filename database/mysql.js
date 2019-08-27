const mysql = require('mysql');
const { database } = require('../config');

const connection = mysql.createConnection(database);

connection.connect(err => {
    if(err) throw err;
    console.log("Conected to MySQL");
})

module.exports = connection;