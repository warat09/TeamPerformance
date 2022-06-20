const {connection,mssql} = require("../config/db")
const cmdqury = require("../sqlcommand/Job")
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