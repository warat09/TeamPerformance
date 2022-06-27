const {connection,mssql} = require("../config/db")
const cmdqury = require("../sqlcommand/Department")
const Iquery = require("../model/Iquery")
const IAdd = require("../model/Iadd")

exports.AddDepartment =async(input)=>{
    let queryresult
        const queryDepartment = cmdqury.AddDepartment()
        const pool = await connection
        await pool.request()
        .input("department",mssql.NVarChar(100),input)
        .query(queryDepartment)
        .then(()=>{
            console.log("YES add")
            queryresult = new IAdd(1,"success")
        }).catch(err=>{
            console.log("no add")
            queryresult = new IAdd(0,err.message)
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
exports.AllDepartment =async()=>{
    const queryDepartment = cmdqury.AllDepartment()
    const pool = await connection
    await pool.request()
    .query(queryDepartment)
    .then(res=>{
        console.log(res.recordset)
        console.log("YES")
        queryresultDepartment = res.recordset

    }).catch(err=>{
        console.log("NO")
        queryresultDepartment = new Iquery(res.recordset,0,err.message)
    })
    return queryresultDepartment
}

exports.AllJobToDepartment=async()=>{
    
}