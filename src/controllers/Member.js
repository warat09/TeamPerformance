const sql = require("../query/member");
const sqldepartment = require("../query/department");
const sqljob = require("../query/job");



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
        var IdDepartment = req.query.IdDepartment;
        sql.OptionMemberDepartment(IdDepartment).then(result=>{
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

exports.MemberScore=async(req,res,next)=>{
    try{
        var score = req.body.score;
        var columnname = req.body.rowname;
        var IdDepartment = req.body.IdDepartment;
        console.log(score)
        console.log(columnname)
        console.log(IdDepartment)
        // let obj = score.find(o => o.Name === 'Thanachai Thoungpugdee');
        // console.log(obj);
        // let itemYouWant = null;
        // score.forEach((item) => {
        //     console.log(item.Name)
            // if (item.Name === 'Thanachai Thoungpugdee') {
            //     itemYouWant = item;
            // }
        // });
        // console.log("hhhhhhhhhhhhhhhhhhhhhhh",itemYouWant);
        for(var i = 1;i < columnname.length;i++){
            await sqljob.CheckJobScore(columnname[i],IdDepartment).then(result=>{
                if(Object.keys(result.data).length == 0){
                    sqljob.AddJobScore(columnname[i],IdDepartment)
                }
            })
        }
        for(var i =0;i<score.length;i++){
        //    await sql.CheckMemberScore(score[i].Name,IdDepartment).then(result=>{
        //         if(Object.keys(result.data).length == 0){
        //             // console.log(score[i].Name)
        //             sql.AddMemberScore(score[i].Name,IdDepartment)
        //         }
        //     })
              var CheckMemberScore = await sql.CheckMemberScore(score[i].Name,IdDepartment);
                if(Object.keys(CheckMemberScore.data).length == 0){
                    var AddMemberScore = await sql.AddMemberScore(score[i].Name,IdDepartment)
                    if(AddMemberScore.status == 0){
                        return res.status(400).json({status:0,message:"Can't AddMember"});
                    }
                }
        }
        var Name

        await score.forEach(async(item,i) => {
            console.log(item.Name)
            // console.log(item.itemYouWant)
            console.log(i)
            Name = item.Name

            await columnname.forEach(async(JOB,i)=>{
                if(i > 0){
                    // console.log(i)
                    // console.log(a)
                    var obj = score.find(o => o.Name === Name);
                    // console.log(obj[JOB])
                    //  console.log("jOB SCORE",obj[i]);
                    //  sql.CheckMemberAndScore(Name,JOB,obj[JOB]).then(result=>{
                    //     if(Object.keys(result.data).length == 0){
                    //         console.log("Jobssss Name",JOB)
                    //          console.log("Namesss",Name)
                    //         sql.AddScore(Name,JOB,obj[JOB])
                    //     }
                    // })
                    //  await sql.UpdateScore(Name,JOB,obj[JOB])
                    // await sql.AddScore(Name,JOB,obj[JOB])

                     var CheckMemberAndScore = await sql.CheckMemberAndScore(Name,JOB,obj[JOB],IdDepartment)
                        //  console.log("Job Name",JOB)
                        //  console.log("Name",Name)
                        if(CheckMemberAndScore.status == 0){
                            var addScore = await sql.AddScore(CheckMemberAndScore.member,CheckMemberAndScore.job,CheckMemberAndScore.score,IdDepartment)
                                if(addScore.status == 0){
                                    return res.status(400).json({status:0,message:"Can't AddScore"});
                                }
                        }
                        else{
                            var updatescore = await sql.UpdateScore(CheckMemberAndScore.member,CheckMemberAndScore.job,CheckMemberAndScore.score,IdDepartment)
                                // console.log("statusstatusstatusstatus11111111111111111111111111",result.status)
                                if(updatescore.status == 0){
                                    return res.status(400).json({status:0,message:"Can't UpdateScore"});
                                }
                        }
                            // if(result.data == 0){
                            //     sql.AddScore(Name,JOB,obj[JOB])
                            // }
                }
                
            })
            // console.log("statusstatusstatusstatus11111111111111111111111111",statusupdatescore)
            

            // if (item.Name === 'Thanachai Thoungpugdee') {
            // }
        });

            // if(statusaddscore.status == 1 && statusupdatescore.status == 1){
                return res.json({ status:1,message: `Insert Score success`});
            // }



    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}
exports.AllScoreTable=async(req,res,next)=>{
    try{
        var IdDepartment = req.query.IdDepartment;
        const allcolumn = await sql.AllColumn(IdDepartment)
        const allcolumnmember = await sql.AllColumnMember(IdDepartment)
        const alltable = await sql.AllScoreTable(IdDepartment)
          var Arraycolumn = allcolumn.map(function (obj) {
            return obj.JOB;
          });
          var ArraycolumnnMember = allcolumnmember.map(function (obj) {
            return obj.MEMBER;
          });
        let a = []
        alltable.forEach((valueData)=>{
            let isName = false
            a.forEach((valueA)=>{
                if(valueA.name === valueData.Member_Fname){
                    isName = true
                    index(valueA,valueData.JOB,valueData.RATE)
                }
            })
            if(!isName){
                let someData =  {name:valueData.Member_Fname}
                Arraycolumn.forEach((value)=>{
                    index(someData,value,0)
                })
                index(someData,valueData.JOB,valueData.RATE)
                a.push(someData)
            }
        })
        return res.json({ status:1,Head:Arraycolumn,BodyMember:ArraycolumnnMember,Body:a});
        // console.log(a)

        function index(obj,is, value) {
            if (typeof is == 'string')
                return index(obj,is.split('.'), value);
            else if (is.length==1 && value!==undefined)
                return obj[is[0]] = value;
            else if (is.length==0)
                return obj;
            else
                return index(obj[is[0]],is.slice(1), value);
        }
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}
exports.RemoveScore=async(req,res,next)=>{
    try{
        var MemberRemove = req.body.MemberRemove;
        var IdDepartment = req.body.IdDepartment;
        var statusRemoveScore,statusRemoveMemberScore
        for(let i = 0;i<MemberRemove.length;i++){
            var RemoveScore = await sql.RemoveScore(MemberRemove[i],IdDepartment)
            var RemoveMemberScore = await sql.RemoveMemberScore(MemberRemove[i],IdDepartment)
            if(RemoveScore.status == 0 || RemoveMemberScore.status ==0){
                return res.status(400).json({status:0,message:"Can't Delete"});
            }
            statusRemoveScore = RemoveScore;
            statusRemoveMemberScore = RemoveMemberScore;
        }
        if(statusRemoveScore.status == 1 && statusRemoveMemberScore.status == 1){
            return res.json({ status:1,message: `Remove ${MemberRemove} Success`});
        }
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}
exports.AllMember=(req,res,next)=>{
    try{
        sql.AllMember().then(result=>{
            return res.json({member:result});
        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}