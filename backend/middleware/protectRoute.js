import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({error:"Unauthorized - No token provided"})
        }
        const decoded = jwt.verify(token,process.env.JNV_SECRET);

        if(!decoded){
            return res.status(401).json({error:"Unauthorized - Invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(401).json({error:"User Not Found"})
        }

        req.user = user 

        next();

    }catch (error){
        return res.status(500).json({error:"internal server error in protect route"})
    }
}

export default protectRoute;