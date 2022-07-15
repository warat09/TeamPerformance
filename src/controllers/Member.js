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
        var IdDepartment = req.body.IdDepartment
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
           await sql.CheckMemberScore(score[i].Name,IdDepartment).then(result=>{
                if(Object.keys(result.data).length == 0){
                    // console.log(score[i].Name)
                    sql.AddMemberScore(score[i].Name,IdDepartment)
                }
            })
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

                     sql.CheckMemberAndScore(Name,JOB,obj[JOB],IdDepartment).then(result=>{
                        //  console.log("Job Name",JOB)
                        //  console.log("Name",Name)
                        console.log(result)
                        if(result.status == 0){
                            sql.AddScore(result.member,result.job,result.score,IdDepartment)
                        }
                        else{
                            sql.UpdateScore(result.member,result.job,result.score,IdDepartment)
                        }
                            // if(result.data == 0){
                            //     sql.AddScore(Name,JOB,obj[JOB])
                            // }
                        })
                    // sql.AddScore(Name,JOB,obj[JOB])

                    console.log("-----------------------------------------------------------------------------------------------------")
                }
            })
            // if (item.Name === 'Thanachai Thoungpugdee') {
            // }
        });



    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
    }
}
exports.AllScoreTable=async(req,res,next)=>{
    try{
        var IdDepartment = req.query.IdDepartment;
        const allcolumn = await sql.AllColumn(IdDepartment)
        const alltable = await sql.AllScoreTable(IdDepartment)
          var Arraycolumn = allcolumn.map(function (obj) {
            return obj.JOB;
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
        return res.json({ status:1,Head:Arraycolumn,Body:a});
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
        var userName = req.body.userName;
        var MemberRemove = req.body.MemberRemove;
        var IdDepartment = req.body.IdDepartment;
        for(let i = 0;i<MemberRemove.length;i++){
            await sql.RemoveScore(userName,MemberRemove[i])
            await sql.RemoveMemberScore(MemberRemove[i],IdDepartment)
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