const {connection,mssql} = require("../config/db")
const cmdqury = require("../sqlcommand/Member")
const Iquery = require("../model/Iquery")
const IAdd = require("../model/Iadd")
const Iscore = require("../model/Iscore")

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
exports.CheckMemberScore =async(input,IdDepartment)=>{
    console.log("input sql",input)
    let queryresult
        const queryMember = cmdqury.CheckMemberScore()
        const pool = await connection
        await pool.request()
        .input("member_fname",mssql.NVarChar(100),input)
        .input("department",mssql.Int(4),IdDepartment)
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
exports.OptionMemberDepartment =async(IdDepartment)=>{
    const queryMember = cmdqury.OptionMemberDepartment()
    const pool = await connection
    await pool.request()
    .input("department",mssql.Int(4),IdDepartment)
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
exports.AddMemberScore =async(input,IdDepartment)=>{
    let queryresult
        const queryMember = cmdqury.AddMemberScore()
        const pool = await connection
        await pool.request()
        .input("member",mssql.NVarChar(100),input)
        .input("department",mssql.Int(4),IdDepartment)
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
exports.CheckMemberAndScore=async(member,job,score,IdDepartment)=>{
    let queryresult
    const queryMemberAndScore = cmdqury.CheckScore()
    const pool = await connection
    await pool.request()
    .input("member",mssql.NVarChar(100),member)
    .input("job",mssql.NVarChar(100),job)
    .input("department",mssql.Int(4),IdDepartment)
    .query(queryMemberAndScore)
    .then(res=>{
        console.log(res.recordset.length)
        console.log("YES")
        queryresult = new Iscore(member,job,score,res.recordset.length)
    }).catch(err=>{
        console.log("NO")
        queryresult = new Iquery(res.recordset,0,err.message)
    })
    return queryresult
    // console.log("sql member is",member)
    // console.log("sql job is",job)
    // console.log("sql score is",score)
    // let queryresult
    // const queryMemberAndScore = cmdqury.CheckScore()
    // const pool = await connection
    // await pool.request()
    // .input("member",mssql.NVarChar(100),member)
    // .input("job",mssql.NVarChar(100),job)
    // .input("score",mssql.Int(4),score)
    // .query(queryMemberAndScore)
    // .then(res=>{
    //     console.log(res.recordset)
    //     console.log("YES")
    //     queryresult = new Iquery(res.recordset,1,"success")
    // }).catch(err=>{
    //     console.log("NO")
    //     queryresult = new Iquery(res.recordset,0,err.message)
    // })
    // return queryresult
}
exports.AddScore =async(member,job,score,IdDepartment)=>{

    let queryresult
        const queryMember = cmdqury.AddScore()
        const pool = await connection
        await pool.request()
        .input("member",mssql.NVarChar(100),member)
        .input("job",mssql.NVarChar(100),job)
        .input("score",mssql.Int(4),score)
        .input("department",mssql.Int(4),IdDepartment)
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
exports.UpdateScore =async(member,job,score,IdDepartment)=>{
    console.log("sql update member is",member)
    console.log("sql update job is",job)
    console.log("sql update score is",score)
    let queryresult
        const queryScore = cmdqury.UpdateScore()
        const pool = await connection
        await pool.request()
        .input("member",mssql.NVarChar(100),member)
        .input("job",mssql.NVarChar(100),job)
        .input("score",mssql.Int(4),score)
        .input("department",mssql.Int(4),IdDepartment)
        .query(queryScore)
        .then(()=>{
            console.log("YES add")
            queryresult = new IAdd(1,"success")
        }).catch(err=>{
            console.log("no add")
            queryresult = new IAdd(0,err.message)
        })
        return queryresult
}
exports.AllColumn=async(IdDepartment)=>{
    let queryresult
    const queryColumnName = cmdqury.ColumName()
    const pool = await connection
    await pool.request()
    .input("department",mssql.NVarChar(100),IdDepartment)
    .query(queryColumnName)
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
exports.AllScoreTable=async(IdDepartment)=>{
    let queryresult
    const queryTableScore = cmdqury.AllTableScore()
    const pool = await connection
    await pool.request()
    .input("department",mssql.NVarChar(100),IdDepartment)
    .query(queryTableScore)
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
exports.RemoveScore=async(MemberRemove,IdDepartment)=>{
    let queryresult
    const queryRemovescore = cmdqury.RemoveScore()
    const pool = await connection
    await pool.request()
    .input("fname",mssql.NVarChar(100),MemberRemove)
    .input("department",mssql.Int(4),IdDepartment)
    .query(queryRemovescore)
    .then(()=>{
        console.log("YES add")
        queryresult = new IAdd(1,"success")
    }).catch(err=>{
        console.log("no add")
        queryresult = new IAdd(0,err.message)
    })
    return queryresult
}
exports.RemoveMemberScore=async(MemberRemove,IdDepartment)=>{
    console.log(MemberRemove)
    let queryresult
    const queryRemovemember = cmdqury.RemoveMemberScore()
    const pool = await connection
    await pool.request()
    .input("fname",mssql.NVarChar(100),MemberRemove)
    .input("department",mssql.Int(4),IdDepartment)
    .query(queryRemovemember)
    .then(()=>{
        console.log("YES add")
        queryresult = new IAdd(1,"success")
    }).catch(err=>{
        console.log("no add")
        queryresult = new IAdd(0,err.message)
    })
    return queryresult
}