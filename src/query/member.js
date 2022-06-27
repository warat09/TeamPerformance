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
        .then(()=>{
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
exports.CheckMemberAddToDepartment=async(IdMember,IdDepartment)=>{
    let queryresult
    const queryCheckMemberAndDepartment = cmdqury.CheckMemberAddToDepartment()
    const pool = await connection
    await pool.request()
    .input("member",mssql.Int(4),IdMember)
    .input("department",mssql.Int(4),IdDepartment)
    .query(queryCheckMemberAndDepartment)
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
exports.MemberToDepartment=async(IdMember,IdDepartment)=>{
    let queryresult
    const queryAddMemberToDepartment = cmdqury.AddMemberToDepartment()
    const pool = await connection
    await pool.request()
    .input("member",mssql.Int(4),IdMember)
    .input("department",mssql.Int(4),IdDepartment)
    .query(queryAddMemberToDepartment)
    .then(()=>{
    console.log("YES add")
    queryresult = new IAdd(1,"success")
    }).catch(err=>{
        console.log("no add")
        queryresult = new IAdd(0,err.message)
    })    
    return queryresult
}
exports.AllMemberToDepartment =async(Member,IdDepartment)=>{
    const queryAllMemberToDepartment = cmdqury.AddAllMemberToDepartment()
    const pool = await connection
    await pool.request()
    .input("member",mssql.NVarChar(100),Member)
    .input("department",mssql.Int(4),IdDepartment)
    .query(queryAllMemberToDepartment)
}

exports.OptionMember =async(input)=>{
    const queryMember = cmdqury.OptionMember()
    const pool = await connection
    await pool.request()
    .input("department",mssql.NVarChar(100),input)
    .query(queryMember)
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