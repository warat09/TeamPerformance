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
exports.EditDepartment=async(id,department)=>{
    let queryresult
    const queryEditDepartment = cmdqury.EditDepartment()
    const pool = await connection
    await pool.request()
    .input("id",mssql.Int(4),id)
    .input("department",mssql.NVarChar(100),department)
    .query(queryEditDepartment)
    .then(()=>{
        console.log("YES add")
        queryresult = new IAdd(1,"success")
    }).catch(err=>{
        console.log("no add")
        queryresult = new IAdd(0,err.message)
    })
    return queryresult
}
exports.EditJobDepartment=async(iddepartment,idjob,olddepartment,oldjob)=>{
    console.log(iddepartment,idjob,olddepartment,oldjob)
    let queryresult
    const queryDepartment = cmdqury.EditJobDepartment()
    const pool = await connection
    await pool.request()
    .input("iddepartment",mssql.Int(4),iddepartment)
    .input("idjob",mssql.Int(4),idjob)
    .input("department",mssql.NVarChar(100),olddepartment)
    .input("job",mssql.NVarChar(100),oldjob)
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
exports.EditMemberDepartment=async(iddepartment,idmember,olddepartment,oldmember)=>{
    let queryresult
    const queryDepartment = cmdqury.EditMemberDepartment()
    const pool = await connection
    await pool.request()
    .input("iddepartment",mssql.Int(4),iddepartment)
    .input("idmember",mssql.Int(4),idmember)
    .input("department",mssql.NVarChar(100),olddepartment)
    .input("member",mssql.NVarChar(100),oldmember)
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
exports.CheckJobScore=async(job,department)=>{
    let queryresult
    const queryCheckJobScore = cmdqury.CheckJobScore()
    const pool = await connection
    await pool.request()
    .input("job",mssql.NVarChar(100),job)
    .input("department",mssql.NVarChar(100),department)
    .query(queryCheckJobScore)
    .then(res=>{
        console.log("YES")
        queryresult = new Iquery(res.recordset,1,"success")

    }).catch(err=>{
        console.log("NO")
        queryresult = new Iquery(res.recordset,0,err.message)
    })
    return queryresult
}
exports.CheckMemberScore=async(member,department)=>{
    let queryresult
    const queryCheckMemberScore = cmdqury.CheckMemberScore()
    const pool = await connection
    await pool.request()
    .input("member",mssql.NVarChar(100),member)
    .input("department",mssql.NVarChar(100),department)
    .query(queryCheckMemberScore)
    .then(res=>{
        console.log("YES")
        queryresult = new Iquery(res.recordset,1,"success")

    }).catch(err=>{
        console.log("NO")
        queryresult = new Iquery(res.recordset,0,err.message)
    })
    return queryresult
}
exports.GetIdJobDepartment=async(department,job)=>{
    let queryresult
    const queryDepartment = cmdqury.GetIdJobDepartment()
    const pool = await connection
    await pool.request()
    .input("job",mssql.NVarChar(100),job)
    .input("department",mssql.NVarChar(100),department)
    .query(queryDepartment)
    .then(res=>{
        console.log("YES")
        queryresult = new Iquery(res.recordset,1,"success")

    }).catch(err=>{
        console.log("NO")
        queryresult = new Iquery(res.recordset,0,err.message)
    })
    return queryresult
}
exports.GetIdMemberDepartment=async(department,member)=>{
    let queryresult
    const queryDepartment = cmdqury.GetIdMemberDepartment()
    const pool = await connection
    await pool.request()
    .input("member",mssql.NVarChar(100),member)
    .input("department",mssql.NVarChar(100),department)
    .query(queryDepartment)
    .then(res=>{
        console.log("YES")
        queryresult = new Iquery(res.recordset,1,"success")

    }).catch(err=>{
        console.log("NO")
        queryresult = new Iquery(res.recordset,0,err.message)
    })
    return queryresult
}
exports.IdDepartment=async(department)=>{
    let queryresult
        const queryDepartment = cmdqury.IdDepartment()
        const pool = await connection
        await pool.request()
        .input("department",mssql.NVarChar(100),department)
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
exports.DeleteJobScoreId=async(id)=>{
    let queryresult
        const queryDeleteJobScoreId = cmdqury.DeleteJobScoreId()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),id)
        .query(queryDeleteJobScoreId)
        .then(()=>{
            console.log("YES add")
            queryresult = new IAdd(1,"success")
        }).catch(err=>{
            console.log("no add")
            queryresult = new IAdd(0,err.message)
        })
        return queryresult
}
exports.DeleteMemberScoreId=async(id)=>{
    let queryresult
        const queryDeleteMemberScore = cmdqury.DeleteMemberScoreId()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),id)
        .query(queryDeleteMemberScore)
        .then(()=>{
            console.log("YES add")
            queryresult = new IAdd(1,"success")
        }).catch(err=>{
            console.log("no add")
            queryresult = new IAdd(0,err.message)
        })
        return queryresult
}
exports.DeleteDepartment=async(id)=>{
    let queryresult
        const queryDepartment = cmdqury.DeleteDepartment()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),id)
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
exports.DeleteJobDepartment=async(id)=>{
    let queryresult
        const queryDepartment = cmdqury.DeleteJobDepartment()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),id)
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
exports.DeleteAllJobDepartment=async(id)=>{
    let queryresult
        const queryDepartment = cmdqury.DeleteAllJobDepartment()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),id)
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
exports.DeleteMemberDepartment=async(id)=>{
    let queryresult
        const queryDepartment = cmdqury.DeleteMemberDepartment()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),id)
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
exports.DeleteScoreJob=async(id)=>{
    let queryresult
        const queryDeleteScoreJob = cmdqury.DeleteScoreJob()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),id)
        .query(queryDeleteScoreJob)
        .then(()=>{
            console.log("YES add")
            queryresult = new IAdd(1,"success")
        }).catch(err=>{
            console.log("no add")
            queryresult = new IAdd(0,err.message)
        })
        return queryresult
}
exports.DeleteScoreMember=async(id)=>{
    let queryresult
        const queryDeleteScoreMember = cmdqury.DeleteScoreMember()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),id)
        .query(queryDeleteScoreMember)
        .then(()=>{
            console.log("YES add")
            queryresult = new IAdd(1,"success")
        }).catch(err=>{
            console.log("no add")
            queryresult = new IAdd(0,err.message)
        })
        return queryresult
}
exports.DeleteIdJobDepartment=async(id)=>{
    let queryresult
        const queryDepartment = cmdqury.DeleteIdJobDepartment()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),id)
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
exports.DeleteIdMemberDepartment=async(id)=>{
    let queryresult
        const queryDepartment = cmdqury.DeleteIdMemberDepartment()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),id)
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
exports.DeleteAllMemberDepartment=async(id)=>{
    let queryresult
        const queryDepartment = cmdqury.DeleteAllMemberDepartment()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),id)
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
exports.DeleteJobScore=async(id)=>{
    let queryresult
        const queryDepartment = cmdqury.DeleteJobScore()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),id)
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
exports.DeleteMemberScore=async(id)=>{
    let queryresult
        const queryDepartment = cmdqury.DeleteMemberScore()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),id)
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
exports.DeleteScore=async(id)=>{
    let queryresult
        const queryDepartment = cmdqury.DeleteScore()
        const pool = await connection
        await pool.request()
        .input("id",mssql.Int(4),id)
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