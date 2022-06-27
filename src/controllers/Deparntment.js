const sql = require("../query/department");
const sqljob = require("../query/job")

exports.AddDepartment=async(req,res,next)=>{
    var department = req.body.department;
    try{
        sql.CheckDepartment(department).then(result=>{
            if(Object.keys(result.data).length == 0){
                sql.AddDepartment(department).then(result=>{
                    if(result.status == 1){
                        sqljob.CheckJob
                        
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
