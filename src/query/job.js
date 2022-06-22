const {connection,mssql} = require("../config/db")
const cmdqury = require("../sqlcommand/Job")
const cmdquryDepartment = require("../sqlcommand/Department")
const Iquery = require("../model/Iquery")
const IAdd = require("../model/Iadd")

exports.AddJob =async(input)=>{ 
    let queryresult
        const queryJob = cmdqury.AddJob()
        const pool = await connection
        await pool.request()
        .input("job",mssql.NVarChar(100),input)
        .query(queryJob)
        .then(()=>{
            console.log("YES add")
            queryresult = new IAdd(1,"success")
        }).catch(err=>{
            console.log("no add")
            queryresult = new IAdd(0,err.message)
        })
        return queryresult
}
exports.CheckJob =async(input)=>{
    let queryresult
        const queryJob = cmdqury.CheckJob()
        const pool = await connection
        await pool.request()
        .input("job",mssql.NVarChar(100),input)
        .query(queryJob)
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
exports.JobToDepartment=async()=>{
    const queryJob = cmdqury.AllJob()
    const queryDepartment = cmdquryDepartment.AllDepartment()
    const pool = await connection
    await pool.request()
    .query(queryJob)
    .then(res=>{
        console.log(res.recordset)
        console.log("YES")
        queryresult = res.recordset

    }).catch(err=>{
        console.log("NO")
        queryresult = new Iquery(res.recordset,0,err.message)
    })
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


    return {queryresult,queryresultDepartment}
}

exports.OptionJob =async(input)=>{
    const queryJob = cmdqury.OptionJob()
    const pool = await connection
    await pool.request()
    .input("job",mssql.NVarChar(100),input)
    .query(queryJob)
    .then(res=>{
        console.log(res.recordset)
        console.log("YES")
        queryresult = res.recordset

    }).catch(err=>{
        console.log("NO")
        queryresult = new Iquery(res.recordset,0,err.message)
    })
    return queryresult
}
