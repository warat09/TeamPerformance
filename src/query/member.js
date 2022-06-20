const {connection,mssql} = require("../config/db")
const cmdqury = require("../sqlcommand/Member")
const Iquery = require("../model/Iquery")
const IAdd = require("../model/Iadd")

exports.AddMember =async(input)=>{
    let queryresult
        const queryMember = cmdqury.AddMember()
        const pool = await connection
        await pool.request()
        .input("member",mssql.NVarChar(100),input)
        .query(queryMember)
        .then(res=>{
            console.log("YES add")
            queryresult = new IAdd(1,"success")
        }).catch(err=>{
            console.log("no add")
            queryresult = new IAdd(0,err.message)
        })
        return queryresult
}
exports.CheckMember =async(input)=>{
    let queryresult
        const queryMember = cmdqury.CheckMember()
        const pool = await connection
        await pool.request()
        .input("member",mssql.NVarChar(100),input)
        .query(queryMember)
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