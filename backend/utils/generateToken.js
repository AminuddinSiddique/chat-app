import jwt from 'jsonwebtoken';


const generateTokenAndSetCookie = (userId,res) =>{
    const token = jwt.sign({userId},process.env.JNV_SECRET,{
        expiresIn: '15d'
    })
    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000 , //MilliSeconds
        httpOnly: true, //prevents XSS attack
        sameSite: "strict", //CSRF Attack prevention
		secure: process.env.NODE_ENV !== "development",

    });
}

export default generateTokenAndSetCookie;