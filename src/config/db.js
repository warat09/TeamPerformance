const dotenv = require('dotenv')
const mssql = require("mssql");
dotenv.config();
var connection = new mssql.ConnectionPool({
    server:process.env.host,
    user: process.env.user,
    password:process.env.password,
    database:process.env.database,
    options:{
        encrypt:false,
        trustServerCertificate:false
    }
}).connect().then(pool =>{
    console.log("Database connect");
    return pool;
}).catch(err => console.log("Database connect error!!",err))

module.exports = {connection,mssql};