const sql = require("../query/department");
const sqljob = require("../query/job")
const sqlmember = require("../query/member");
const { DeleteScore } = require("../sqlcommand/Department");

exports.AddDepartment=async(req,res,next)=>{
    var department = req.body.department;
    try{
        sql.CheckDepartment(department).then(result=>{
            if(Object.keys(result.data).length == 0){
                sql.AddDepartment(department).then(async(result)=>{
                    if(result.status == 1){
                        sqljob.AllJob().then(result=>{
                            console.log("result is ",result)
                            let lengthjob = Object.keys(result).length
                            console.log("lengthjob is ",lengthjob)
                            for(let i = 0;i < lengthjob;i++){
                                sql.AllJobToDepartment(result[i].ID,department)
                            }
                         sqlmember.AllMember().then(result=>{
                            let lengthmember = Object.keys(result).length
                            for(let i = 0;i < lengthmember;i++){
                                sql.AllMemberToDepartment(result[i].ID,department)
                            }                            
                         })
                        })
                        var datadepartment = await sql.IdDepartment(department);
                        return res.json({ status:1,value:datadepartment.data,message: `Insert department ${department}`});
                    }
                    else{
                        return res.json({ status:0,message: `Can't Insert department ${department}`});
                    }
                })
            }
            else{
                return res.json({ status:0,message: "have department "+department});
            }

        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }
}
exports.EditDepartment=async(req,res,next)=>{
    try{
        var id = req.body.id;
        var olddepartment = req.body.olddepartment;
        var newdepartment = req.body.newdepartment;
        sql.CheckDepartment(newdepartment).then(result=>{
            if(Object.keys(result.data).length == 0){
                sql.EditDepartment(id,newdepartment).then(result=>{
                    if(result.status == 1){
                        return res.json({ status:1,message: `Update Department ${olddepartment} to ${newdepartment} Success`});
                    }
                    else{
                        return res.json({ status:0,message: `Can't Update Department ${olddepartment} to ${newdepartment}`});
                    }    
                })
            }
            else{
                return res.json({ status:0,message: "Have Department "+newdepartment});
            }
        })
    }catch(err){
        return res.status(500).send()
    }

}
exports.DeleteJobDepartment=async(req,res,next)=>{
    try{
        var department = req.body.department;
        var job = req.body.job;
        console.log(job,department)
        var idjobdepartment = await sql.GetIdJobDepartment(department,job);
        if(Object.keys(idjobdepartment.data).length > 0){
            var checkjobscore = await sql.CheckJobScore(job,department);
            if(Object.keys(checkjobscore.data).length > 0){
                await sql.DeleteScoreJob(checkjobscore.data[0].ID);
                await sql.DeleteJobScoreId(checkjobscore.data[0].ID);
            }
            var deletejobdepartment = await sql.DeleteIdJobDepartment(idjobdepartment.data[0].ID);
            if(deletejobdepartment.status == 1){
                return res.json({ status:1,message: `Delete Success`});
            }
            else{
                return res.json({ status:0,message: `Can't Delete`});
            } 
        }
        else{
            return res.json({ status:0,message: `Can't Delete`});
        }
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}
exports.DeleteMemberDepartment=async(req,res,next)=>{
    try{
        var department = req.body.department;
        var member = req.body.member;
        var idmemberdepartment = await sql.GetIdMemberDepartment(department,member);
        if(Object.keys(idmemberdepartment.data).length > 0){
            var checkmemberscore = await sql.CheckMemberScore(member,department);
            if(Object.keys(checkmemberscore.data).length > 0){
                console.log(checkmemberscore.data)
                await sql.DeleteScoreMember(checkmemberscore.data[0].ID);
                await sql.DeleteMemberScoreId(checkmemberscore.data[0].ID);
            }
            var deletememberdepartment = await sql.DeleteIdMemberDepartment(idmemberdepartment.data[0].ID);
            if(deletememberdepartment.status == 1){
                return res.json({ status:1,message: `Delete Success`});
            }
            else{
                return res.json({ status:0,message: `Can't Delete`});
            } 
        }
        else{
            return res.json({ status:0,message: `Can't Delete`});
        }
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}
exports.DeleteDepartment=async(req,res,next)=>{
    try{
        var id = req.body.id;
        var namedepartment = req.body.department;
        console.log(id,namedepartment)
        var checkdepartment = await sql.CheckDepartment(namedepartment);
        if(Object.keys(checkdepartment.data).length != 0){
            await sql.DeleteScore(id);
            await sql.DeleteMemberScore(id);
            await sql.DeleteJobScore(id);
            await sql.DeleteAllMemberDepartment(id);
            await sql.DeleteMemberDepartment(id);
            await sql.DeleteAllJobDepartment(id);
            await sql.DeleteJobDepartment(id);
            var DeleteDepartment = await sql.DeleteDepartment(id);
            if(DeleteDepartment.status == 1){
               return res.json({ status:1,message: `Delete Department ${namedepartment} success`});
                }
                else{
                    return res.json({ status:0,message: `Can't Delete Department ${namedepartment}`});
                } 
        }   
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}
exports.AllDepartment=async(req,res,next)=>{
    try{
        sql.AllDepartment().then(result=>{
            return res.json({Department:result});
        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }
}
exports.CheckMemberDepartment=async(req,res,next)=>{
    try{
        var userName = req.query.userName;
        sql.CheckMemberDepartment(userName).then(result=>{
            return res.json(result);
        })      
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }
}
exports.AllJobDepartment=async(req,res,next)=>{
    try{
        sql.AllJobDepartment().then(result=>{
            console.log(result)
            return res.json({JobDepartment:result});
        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }
}
exports.AllMemberDepartment=async(req,res,next)=>{
    try{
        sql.AllMemberDepartment().then(result=>{
            console.log(result)
            return res.json({MemberDepartment:result});
        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }
}
exports.EditJobDepartment=async(req,res,next)=>{
    try{
        var iddepartment = req.body.iddepartment;
        var idjob = req.body.idjob;
        var olddepartment = req.body.olddepartment;
        var oldjob = req.body.oldjob

        var editjobdepartment = await sql.EditJobDepartment(iddepartment,idjob,olddepartment,oldjob);
        if(editjobdepartment.status == 1){
            return res.json({ status:1,message: `Update Success`});
        }
        else{
            return res.json({ status:0,message: `Can't Update`});
        }
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}
exports.EditMemberDepartment=async(req,res,next)=>{
    try{
        var iddepartment = req.body.iddepartment;
        var idmember = req.body.idmember;
        var olddepartment = req.body.olddepartment;
        var oldmember = req.body.oldmember

        var editmemberdepartment = await sql.EditMemberDepartment(iddepartment,idmember,olddepartment,oldmember);
        if(editmemberdepartment.status == 1){
            return res.json({ status:1,message: `Update Success`});
        }
        else{
            return res.json({ status:0,message: `Can't Update`});
        }
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}
