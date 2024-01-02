var jwt = require('jsonwebtoken')
function verifytoken(req,res,next){
const token = req.cookies.token
if(!token){
    res.status(401).send("you are not authenticated")
}
jwt.verify(token, process.env.SECRETKEY, function(err, user) {
    if(err){
        res.status(403).send("token is not valied")
    }
    req.user=user
    next()
  });
}
module.exports=verifytoken