const sql = require("../query/member");

exports.AddMember=async(req,res,next)=>{
    var member = req.body.member;
    try{
        sql.CheckMember(member).then(result=>{
            if(Object.keys(result.data).length == 0){
                sql.AddMember(member).then(result=>{
                    if(result.status == 1){
                        return res.json({ status:1,message: `Insert Member ${member} success`});
                    }
                    else{
                        return res.json({ status:0,message: `Can't Insert Member ${member}`});
                    }
                })
            }
            else{
                return res.json({ status:0,message: "have Member "+member});
            }

        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }
}