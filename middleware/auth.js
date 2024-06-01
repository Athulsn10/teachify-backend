const jwt = require("jsonwebtoken")
const User = require('../Models/userModel')

const protect = async (req,res,next)=>{
    let token;
    if (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_TOKEN)
            req.user=await User.findById(decoded.id).select("-password");
            next(); 
        }catch (error) {
            res.status(401).json({ message: 'Unauthorized Request, Please Login Again' });
        }
    }
    
if (!token) {
    res.status(401).json({ error: 'Authorization header missing or incorrect format' });
    return;
}
}

module.exports = {protect}