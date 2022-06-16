var jwt = require('jsonwebtoken');
 
exports.verifitoken= async(req,res,next)=>{
    const authHeader = await req.header['access-token'];
    const token = await authHeader;
    if (!token) {
        return res.status(403).send("A token is required for authentication");
      }
      try {
        jwt.verify(token,config.Token.TOKEN_SECRET,async (err, user) => {
            if (err) {
              console.log("tokeneex");
              return res.json({ status:"ex",message: "tokeneex"});
          } else {
              return res.json({ status:"ok",message: "notex"});
            }
          })
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
      return next();
}