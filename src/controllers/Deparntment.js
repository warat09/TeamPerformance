const sql = require("../query/department");
const sqljob = require("../query/job")
const sqlmember = require("../query/member")

exports.AddDepartment=async(req,res,next)=>{
    var department = req.body.department;
    try{
        sql.CheckDepartment(department).then(result=>{
            if(Object.keys(result.data).length == 0){
                sql.AddDepartment(department).then(result=>{
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
