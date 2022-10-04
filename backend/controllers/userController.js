const asyncHandler=require('express-async-handler');
const User=require('../models/userModel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

/**
 * registers a new user
 * @param {*} req 
 * @param {*} res 
 * @route POST api/users/me 
 * @access public
 */
const regiserUser= asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    if (!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    const userExists=User.findOne({email})
    if(!userExists){
        res.status(400)
        //console.log(userExists)
        
        throw new Error('User already exists')

    }

    //hasing password (read about it)
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt)

    const user=await User.create({
        name,
        email,
        password:hashedPassword
    })

    if (user){
        res.status(201).json({
            message:'register user',//sends it to a test DB as the collection wasn't specified
            _id:user.id,
            user:user.email,
            password:user.password

    
    });
    }else{
        res.status(400)
        throw new Error('Invalid user')
    }

})

/**
 * Authenticates a user
 * @param {*} req 
 * @param {*} res 
 * @route POST api/users/login
 * @access private
 */
const loginUser= asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)

    res.status(200).json({
        message:'loging you in',
        user:user
    })
});

/**
 * Updates user
 * @param {*} req 
 * @param {*} res 
 * @route PUT api/user/:id
 * @access private (after auth is added)
 */
const updateUser= asyncHandler(async(req,res)=>{

    const {id}=req.params;
    const user=await User.findById(id)
    if (!user){
        res.status(400);
        throw new Error('User not found')
    };
    const updatedUser=await User.findByIdAndUpdate(id,req.body,{
        new:true
    })
    //new:true creates the element if not found
    
    res.status(200).json({
        message:'updating user...',
        user:updatedUser})

});



/**
 * Get authenticated user data 
 * @param {*} req 
 * @param {*} res 
 * @route POST api/users/login
 * @access private
 */
 const getMe= asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if (!user){
        res.status(400);
        throw new Error('User not found')
    }

    res.status(200).json({
        message:'getting users',
        user:user
    })
});
module.exports={
    regiserUser,
    loginUser,
    updateUser,
    getMe 
}