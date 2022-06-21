const sql = require("../query/job");

exports.AddJob=async(req,res,next)=>{
    var job = req.body.job;
    try{
        sql.CheckJob(job).then(result=>{
            if(Object.keys(result.data).length == 0){
                sql.AddJob(job).then(result=>{
                    if(result.status == 1){
                        return res.json({ status:1,message: `Insert Job ${job} success`});
                    }
                    else{
                        return res.json({ status:0,message: `Can't Insert Job ${job}`});
                    }
                })
            }
            else{
                return res.json({ status:0,message: "have Job "+job});
            }

        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }
}
exports.AddJobToDepartment=async(req,res,next)=>{
    try{
        sql.JobToDepartment().then(result=>{
            return res.json({job:result.queryresult,Department:result.queryresultDepartment});
        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }
}