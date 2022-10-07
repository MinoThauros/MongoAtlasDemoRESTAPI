const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');
const User=require('../models/userModel');
const { ModuleResolutionKind } = require('typescript');

const protect=asyncHandler(async(req,res,next)=>{
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from req header
            token=req.headers.authorization.split(' ')[1]
            //bearer [token] from auth header

            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            //checks the validity of the token; unsigns the id

            req.user=await User.findById(decoded.id).select('-password')
            //getting the payload which is the id
            //using the id to attribute a new prop to req which is .user
            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('not authorized')

        }
    }
    if (!token){
        res.status(401)
        throw new Error('Not authorized, no token')

    }
})

module.exports={protect}