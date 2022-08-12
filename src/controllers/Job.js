const sql = require("../query/job");
const sqlmember = require("../query/member");
const sqldepartment = require("../query/department");


exports.AddJob=async(req,res,next)=>{
    var job = req.body.job;
    try{
        sql.CheckJob(job).then(result=>{
            if(Object.keys(result.data).length == 0){
                sql.AddJob(job).then(result=>{
                    if(result.status == 1){
                        sqldepartment.AllDepartment().then(result=>{
                            let lengthdepartment = Object.keys(result).length
                            console.log(lengthdepartment)
                            for(let i = 0;i < lengthdepartment;i++){
                                sql.AllJobToDepartment(job,result[i].ID)
                            }
                        })
                        return res.json({ status:1,message: `Add Job ${job} Success`});
                    }
                    else{
                        return res.json({ status:0,message: `Can't Add Job ${job}`});
                    }
                })
            }
            else{
                return res.json({ status:0,message: "Have Job "+job});
            }

        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }
}
exports.EditJob=async(req,res,next)=>{
    try{
        var id = req.body.id;
        var oldjob = req.body.oldjob;
        var newjob = req.body.newjob;
        sql.CheckJob(newjob).then(result=>{
            if(Object.keys(result.data).length == 0){
                sql.EditJob(id,newjob).then(result=>{
                    if(result.status == 1){
                        return res.json({ status:1,message: `Update Job ${oldjob} to ${newjob} Success`});
                    }
                    else{
                        return res.json({ status:0,message: `Can't Update Job ${oldjob} to ${newjob}`});
                    }    
                })
            }
            else{
                return res.json({ status:0,message: "Have Job "+newjob});
            }
        })

    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }
}
exports.AddJobToDepartment=async(req,res,next)=>{
    try{
        var Id_Job = req.body.job;
        var Id_Department = req.body.department;
        console.log(Id_Department," ",Id_Job)
        sql.CheckJobAddToDepartment(Id_Job,Id_Department).then(result=>{
            if(Object.keys(result.data).length == 0){
                sql.JobToDepartment(Id_Job,Id_Department).then(result=>{
                    if(result.status == 1){
                        return res.json({ status:1,message: `Insert Job success`});
                    }
                    else{
                        return res.json({ status:0,message: `Can't Insert Job`});
                    }
                })
            }
            else{
                return res.json({ status:0,message: "have Job"});
            }
        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }
}
exports.OptionJob =async(req,res,next)=>{
    try{
        var id = req.query.IdDepartment;
        sql.OptionJob(id).then(result=>{
            console.log(result)
            return res.json({job:result});
        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }

}
exports.OptionJobDepartment=async(req,res,next)=>{
    try{
        var IdDepartment = req.query.IdDepartment;
        sql.OptionJobDepartment(IdDepartment).then(result=>{
            console.log(result)
            return res.json({job:result});
        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}

exports.AddJobScore=async(req,res,next)=>{
    try{
        var Id_Job = req.body.Job_ID;
        var Job_Name = req.body.Job_Name;
        sql.AddJobScore(Id_Job,Job_Name).then(result=>{
            if(result.status == 1){
                return res.json({ status:1,message: `Insert Job success`});
            }
            else{
                return res.json({ status:0,message: `Can't Insert Member`});
            }
        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}
exports.OptionRemoveJobScore=async(req,res,next)=>{
    try{
        var IdDepartment = req.query.IdDepartment;
        sql.OptionRemoveJobScore(IdDepartment).then(result=>{
            console.log(result)
            return res.json({job:result});
        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}
exports.RemoveJobScore=async(req,res,next)=>{
    try{
        var Job_Name = req.body.Job_Name;
        var IdDepartment = req.body.IdDepartment;
        var RemoveScore = await sql.RemoveScore(Job_Name,IdDepartment);
        if(RemoveScore.status == 0){
            return res.status(400).json({status:0,message:"Can't RemoveScore"});
        }
        var RemoveJobScore = await sql.RemoveJobScore(Job_Name,IdDepartment);
        if(RemoveJobScore.status == 0){
            return res.status(400).json({status:0,message:"Can't RemoveJobScore"});
        }
        await sql.CheckRemoveScore(IdDepartment).then(async(result)=>{
            if(Object.keys(result.data).length == 0){
                var RemoveMemberScore =  await sqlmember.RemoveAllMemberScore(IdDepartment);
                if(RemoveMemberScore.status == 0){
                    return res.status(400).json({status:0,message:"Can't RemoveMemberScore"});
                }

            }

        });
        // console.log("length",Object.keys(CheckRemoveScore).length == 0)
        // if(Object.keys(CheckRemoveScore).length == 0){
        //     console.log("0")
        // }
        return res.json({ status:1,message: `Remove ${Job_Name} Success`});
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}
exports.AllJob=async(req,res,next)=>{
    try{
        sql.AllJob().then(result=>{
            return res.json({job:result});
        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}