const {connection,mssql} = require("../config/db")
const cmdqury = require("../sqlcommand/Member")
const Iquery = require("../model/Iquery")
const IAdd = require("../model/Iadd")

exports.AllMember=async()=>{
    try{
        const queryAllMember = cmdqury.AllMember()
        const pool = await connection
        await pool.request()
        .query(queryAllMember)
        .then(res=>{
            console.log(res.recordset)
            console.log("YES")
            queryresult = res.recordset
    
        }).catch(err=>{
            console.log("NO")
            queryresult = new Iquery(res.recordset,0,err.message)
        })

    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }
        return queryresult
}
exports.AddMember =async(Member_Name,Member_FName)=>{
    let queryresult
        const queryMember = cmdqury.AddMember()
        const pool = await connection
        await pool.request()
        .input("member_name",mssql.NVarChar(100),Member_Name)
        .input("member_fname",mssql.NVarChar(100),Member_FName)
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
exports.OptionMemberDepartment =async(input)=>{
    const queryMember = cmdqury.OptionMemberDepartment()
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
exports.AddMemberScore =async(ID_Member,Member_Name,Member_FName)=>{
    let queryresult
        const queryMember = cmdqury.AddMemberScore()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),ID_Member)
        .input("member_name",mssql.NVarChar(100),Member_Name)
        .input("member_fname",mssql.NVarChar(100),Member_FName)
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