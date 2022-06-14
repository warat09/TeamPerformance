const dotenv = require('dotenv')
const mysql = require('mysql')


dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
const config ={server:{port: SERVER_PORT,}}
const TOKEN_SECRET = process.env.TOKEN_KEY;


module.exports = {
    mysql:{
        host:process.env.host,
        user: process.env.user,
        password:process.env.password,
        database:process.env.database
    },
    Token: {
        TOKEN_SECRET: TOKEN_SECRET
      },
}

