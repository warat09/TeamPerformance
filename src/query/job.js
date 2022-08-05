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
exports.CheckJobAddToDepartment=async(IdJob,IdDepartment)=>{
    let queryresult
    const queryCheckJobAndDepartment = cmdqury.CheckJobAddToDepartment()
    const pool = await connection
    await pool.request()
    .input("job",mssql.Int(4),IdJob)
    .input("department",mssql.Int(4),IdDepartment)
    .query(queryCheckJobAndDepartment)
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
exports.CheckJobScore =async(input,IdDepartment)=>{
    let queryresult
        const queryJob = cmdqury.CheckJobScore()
        const pool = await connection
        await pool.request()
        .input("job",mssql.NVarChar(100),input)
        .input("department",mssql.Int(4),IdDepartment)
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
exports.CheckRemoveScore=async(IdDepartment)=>{
    let queryresult
    const CheckRemoveScore = cmdqury.CheckRemoveJobScore()
    const pool = await connection
    await pool.request()
    .input("department",mssql.Int(4),IdDepartment)
    .query(CheckRemoveScore)
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
exports.JobToDepartment=async(IdJob,IdDepartment)=>{
    let queryresult
    const queryAddJobToDepartment = cmdqury.AddJobToDepartment()
    const pool = await connection
    await pool.request()
    .input("job",mssql.Int(4),IdJob)
    .input("department",mssql.Int(4),IdDepartment)
    .query(queryAddJobToDepartment)
    .then(()=>{
    console.log("YES add")
    queryresult = new IAdd(1,"success")
    }).catch(err=>{
        console.log("no add")
        queryresult = new IAdd(0,err.message)
    })    
    return queryresult
}
exports.AllJobToDepartment=async(Job,IdDepartment)=>{
    const queryAllJobToDepartment = cmdqury.AddAllJobToDepartment()
    const pool = await connection
    await pool.request()
    .input("job",mssql.NVarChar(100),Job)
    .input("department",mssql.Int(4),IdDepartment)
    .query(queryAllJobToDepartment)
}

exports.AllJob=async()=>{
    try{
        const queryAllJob = cmdqury.AllJob()
        const pool = await connection
        await pool.request()
        .query(queryAllJob)
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

exports.OptionJobDepartment=async(input)=>{
    const queryJob = cmdqury.OptionJobDepartment();
    const pool = await connection
    await pool.request()
    .input("department",mssql.Int(4),input)
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
exports.AddJobScore =async(Job_Name,IdDepartment)=>{
    let queryresult
        const queryJob = cmdqury.AddJobScore()
        const pool = await connection
        await pool.request()
        .input("job",mssql.NVarChar(100),Job_Name)
        .input("department",mssql.Int(4),IdDepartment)
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
exports.OptionRemoveJobScore=async(IdDepartment)=>{
    const queryJobRemove = cmdqury.OptionRemoveJobScore();
    const pool = await connection
    await pool.request()
    .input("department",mssql.Int(4),IdDepartment)
    .query(queryJobRemove)
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
exports.RemoveScore=async(Job_Name,IdDepartment)=>{
    let queryresult
    const queryRemovescore = cmdqury.RemoveScore()
    const pool = await connection
    await pool.request()
    .input("job",mssql.NVarChar(100),Job_Name)
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
exports.RemoveJobScore=async(Job_Name,IdDepartment)=>{
    const queryRemoveJobScore = cmdqury.RemoveJobScore();
    const pool = await connection
    await pool.request()
    .input("department",mssql.Int(4),IdDepartment)
    .input("job",mssql.NVarChar(100),Job_Name)
    .query(queryRemoveJobScore)
    .then(res=>{
        console.log(res.recordset)
        console.log("YES")
        queryresult = new IAdd(1,"success")
    }).catch(err=>{
        console.log("NO")
        queryresult = new IAdd(0,err.message)
    })
    return queryresult
}
