const {connection,mssql} = require("../config/db")
const cmdqury = require("../sqlcommand/User")
const Iquery = require("../model/Iquery")

exports.login =async(input)=>{
    let queryresult
        const querylogin = cmdqury.login()
        const pool = await connection
        await pool.request()
        .input("User_name",mssql.NVarChar(100),input)
        .query(querylogin)
        .then(res=>{
            console.log(res)
            queryresult = new Iquery(res.recordset,1,"success")
        }).catch(err=>{
            queryresult = new Iquery(res.recordset,0,err.message)
        })
        return queryresult
}