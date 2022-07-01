const sql = require("../query/member");
const sqldepartment = require("../query/department");


exports.AddMember=async(req,res,next)=>{
    var Member_Name = req.body.userName;
    var Member_FName = req.body.userFname;
    console.log(Member_Name+" "+Member_FName)

    try{
        sql.CheckMember(Member_Name).then(result=>{
            if(Object.keys(result.data).length == 0){
                sql.AddMember(Member_Name,Member_FName).then(result=>{
                    if(result.status == 1){
                        sqldepartment.AllDepartment().then(result=>{
                            let lengthdepartment = Object.keys(result).length
                            console.log(lengthdepartment)
                            for(let i = 0;i < lengthdepartment;i++){
                                sql.AllMemberToDepartment(Member_Name,result[i].ID)
                            }
                        })
                    }
                    else{
                        return res.json({ status:0,message: `Can't Insert Member ${Member_FName}`});
                    }
                })
            }
            else{
                return res.json({ status:0,message: "have Member "+Member_FName});
            }

        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }
}
exports.AddMemberToDepartment=async(req,res,next)=>{
    try{
        var Id_Member = req.body.member;
        var Id_Department = req.body.department;
        sql.CheckMemberAddToDepartment(Id_Member,Id_Department).then(result=>{
            if(Object.keys(result.data).length == 0){
                sql.MemberToDepartment(Id_Member,Id_Department).then(result=>{
                    if(result.status == 1){
                        return res.json({ status:1,message: `Insert Job success`});
                    }
                    else{
                        return res.json({ status:0,message: `Can't Insert Member`});
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

exports.OptionMember=async(req,res,next)=>{
    try{
        var id = req.query.IdDepartment;
        sql.OptionMember(id).then(result=>{
            console.log(result)
            return res.json({member:result});
        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }

}
exports.OptionMemberDepartment=async(req,res,next)=>{
    try{
        var userName = req.query.userName;
        sql.OptionMemberDepartment(userName).then(result=>{
            console.log(result)
            return res.json({member:result});
        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }

}
exports.AddMemberScore=async(req,res,next)=>{

    try{
        var Id_Member = req.body.Member_ID;
        var Member_Name = req.body.Member_Name;
        var Member_Fname = req.body.Member_Fname;
        sql.AddMemberScore(Id_Member,Member_Name,Member_Fname).then(result=>{
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