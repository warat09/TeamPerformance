const {connection,mssql} = require("../config/db")
const cmdqury = require("../sqlcommand/Department")
const Iquery = require("../model/Iquery")
const IAddDepartment = require("../model/Idepartment")

exports.AddDepartment =async(input)=>{
    let queryresult
        const queryDepartment = cmdqury.AddDepartment()
        const pool = await connection
        await pool.request()
        .input("department",mssql.NVarChar(100),input)
        .query(queryDepartment)
        .then(res=>{
            console.log("YES add")
            queryresult = new IAddDepartment(1,"success")
        }).catch(err=>{
            console.log("no add")
            queryresult = new IAddDepartment(0,err.message)
        })
        return queryresult
}
exports.CheckDepartment =async(input)=>{
    let queryresult
        const queryDepartment = cmdqury.CheckDepartment()
        const pool = await connection
        await pool.request()
        .input("department",mssql.NVarChar(100),input)
        .query(queryDepartment)
        .then(res=>{
            console.log(res.recordset)
            console.log("YES")
            queryresult = new Iquery(res.recordset,1,"success")

        }).catch(err=>{
            console.log("NO")
            queryresult = new Iquery(res.recordset,0,err.message)
        })
        return queryresult
}