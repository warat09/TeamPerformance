const sql = require("../query/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config/config')
const axios = require('axios')
exports.GetallData =async(req,res,next)=>{
    // return res.json({message: "Login Success!! "+req.query.token});
    const authHeader = await req.headers.authorization;
    const token = await authHeader.split(' ')[1];
    jwt.verify(
      token,
        config.Token.TOKEN_SECRET,
        async (err, user) => {
          if (err) {
            console.log("tokeneex");
            return res.json({ status:400,message: "tokeneex"});
        } else {
          await axios.post('http://bwc-webserv02.bdms.co.th:3300/bwcportaluser/api/login', {
            userName: user.userName,
            password: user.password,
            appId:user.appId
          })
          .then((response)=> {
            var result = response.data;
            console.log(result.data)
            return res.status(200).json({data:result.data,status:result.status});        
          })
          .catch((err)=> {
            return res.status(400).json(err);
          });
          }
        }
      );
}

exports.Login =async(req,res,next)=>{
    var user = req.body.userName;
    var password = req.body.password;
    var appId = req.body.appId;
    await axios.post('http://bwc-webserv02.bdms.co.th:3300/bwcportaluser/api/login', {
        userName: user,
        password: password,
        appId:appId
      })
      .then((response)=> {
        var result = response.data;
        const token = jwt.sign(
            { 
              userName: user,
              password: password,
              appId:appId
            },
           config.Token.TOKEN_SECRET,
           { expiresIn: "30d" }
           );
        return res.status(200).json({status:result.status,token:token});        
      })
      .catch((err)=> {
        return res.status(400).json(err);
      });
}


