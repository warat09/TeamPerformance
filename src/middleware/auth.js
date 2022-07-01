var jwt = require('jsonwebtoken');
var config = require('../config/config')

 
exports.verifitoken= async(req,res,next)=>{
    const authHeader = await req.headers.authorization;
    const token = await authHeader.split(' ')[1];

    console.log(authHeader)
    if (!token) {
        return res.status(403).send("A token is required for authentication");
      }
      try {
        jwt.verify(token,config.Token.TOKEN_SECRET,async (err, user) => {
            if (err) {
              console.log("tokeneex");
              return res.json({ status:0,message: "tokeneex"});
          } else {
            console.log("tokennotex");
              return res.json({ status:1,User:user.userName,message: "notex"});
            }
          })
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
      return next();
}