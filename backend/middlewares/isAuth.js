// iss middleware se hm apne logged in user k details fetch krenge
// hmne tokens store kr rkha hai cookies me

import e from "express"
import jwt from "jsonwebtoken"
const isAuth = async (req,res,next) => {
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({message: "Token not found!"})
        }
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!decodeToken){
            return res.status(400).json({message: "Token not verified!"})
        }
        // req me key bna rhe
        req.userId = decodeToken.userId
        next()
    } catch (error) {
        return res.status(500).json({message: "isAuth Middleware Error"})
    }
}


export default isAuth