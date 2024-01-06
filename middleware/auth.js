const jwt = require("jsonwebtoken")
const User = require('../Models/userModel')

const protect = async (req,res,next)=>{
    let token;
    if (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ){
        try{
            // remove bearer and take token
            token = req.headers.authorization.split(" ")[1]
            // token is decode id
            const decoded = jwt.verify(token,process.env.JWT_TOKEN)
            // return user id without the password
            req.user=await User.findById(decoded.id).select("-password");
            // move to nxt operation
            next(); 
        }catch (error) {
            res.status(401).json({ error: 'Token Failed due to unauthorized' });
        }
    }
    
if (!token) {
    res.status(401).json({ error: 'Authorization header missing or incorrect format' });
    return;
}
}

module.exports = {protect}