const dotenv = require('dotenv')
const mysql = require("mysql");
dotenv.config();
var connection = mysql.createConnection({
    host:process.env.host,
    user: process.env.user,
    password:process.env.password,
    database:process.env.database
});

module.exports = connection;