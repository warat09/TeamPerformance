const sql = require("../query/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config/config')

exports.Checktoken =(req,res,next)=>{
    // return res.json({message: "Login Success!! "+req.query.token});
    jwt.verify(
        req.query.token,
        config.Token.TOKEN_SECRET,
        async (err, user) => {
          if (err) {
            console.log("tokeneex");
            return res.json({ status:"ex",message: "tokeneex"});
        } else {
            return res.json({ status:"ok",message: "notex"});
          }
        }
      );
}

exports.Register =(req,res,next)=>{
    var email = req.body.email;
    var password = req.body.password;
    try{
        sql.query("SELECT COUNT(*) AS Count FROM User WHERE email = ?",[email],(err,result)=>{
            if(err){
                console.log("Error select ",err);
                return res.status(400).send();
            }
            else{
                if(result[0].Count != 0){
                    return res.status(400).json({message:"email have"});
                }
                else{
                    bcrypt.hash(password, 10).then((hashpassword)=>{
                        console.log("password ",password);
                        console.log("hashpassword ",hashpassword);

                        bcrypt.compare(password, hashpassword, function(err, result) {
                            if (err) { throw (err); }
                            console.log(result);
                        });
                        sql.query("INSERT INTO User(email, password) VALUES (?,?)",[email,hashpassword],(err,result)=>{
                            if(err){
                                console.log("Error insert ",err);
                                return res.status(400).send();
                            }
                            return res.status(201).json({message:"Create success"})
                            })
                    })
                }
            }
        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }
}
exports.Login =(req,res,next)=>{
    var email = req.body.email;
    var password = req.body.password;
    console.log("Login email",email);
    console.log("Login password",password);
    try{
        sql.login(email).then(result=>{
            console.log("checkdata",Object.keys(result.data).length)
            // if(result){
            //     console.log("no data")
            // }
            // if(result.status == 1){
            //     const token = jwt.sign(
            //      { User_email: email },
            //     config.Token.TOKEN_SECRET,
            //     { expiresIn: "30d" }
            //     );
            //     console.log(token)
            //     return res.json({ status:1,message: "Login Success!! ",token});
            // }
            if(Object.keys(result.data).length == 0){
                console.log("0000")
            }
            else{
                // console.log("111")
                // bcrypt.compare(password, result.data.password)
                if(result.status == 1){
                const token = jwt.sign(
                 { User_email: email },
                config.Token.TOKEN_SECRET,
                { expiresIn: "30d" }
                );
                console.log(token)
                return res.json({ status:1,message: "Login Success!! ",token});
                }
            }

        })
    }catch(err){
        console.log("error is",err);
        return res.status(500).send()
        }

}


