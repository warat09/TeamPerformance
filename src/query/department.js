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

exports.AllJobToDepartment=async(IdJob,Department)=>{
    const queryAllJobToDepartment = cmdqury.AddAllJobToDepartment()
    const pool = await connection
    await pool.request()
    .input("job",mssql.Int(4),IdJob)
    .input("department",mssql.NVarChar(100),Department)
    .query(queryAllJobToDepartment)
}

exports.AllMemberToDepartment =async(IdMember,Department)=>{
    const queryAllMemberToDepartment = cmdqury.AddAllMemberToDepartment()
    const pool = await connection
    await pool.request()
    .input("member",mssql.Int(4),IdMember)
    .input("department",mssql.NVarChar(100),Department)
    .query(queryAllMemberToDepartment)
}
exports.CheckMemberDepartment =async(userName)=>{
    let queryresult
    const queryMemberDepartment = cmdqury.CheckMemberDepartment()
    const pool = await connection
    await pool.request()
    .input("member",mssql.NVarChar(100),userName)
    .query(queryMemberDepartment)
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
exports.AllJobDepartment=async()=>{
    let queryresult
    const queryAllJobDepartment = cmdqury.AllJobDepartment()
    const pool = await connection
    await pool.request()
    .query(queryAllJobDepartment)
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
exports.AllMemberDepartment=async()=>{
    let queryresult
    const queryAllMemberDepartment = cmdqury.AllMemberDepartment()
    const pool = await connection
    await pool.request()
    .query(queryAllMemberDepartment)
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