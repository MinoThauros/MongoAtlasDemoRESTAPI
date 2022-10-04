const asyncHandler=require('express-async-handler');
const User=require('../models/userModel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

/**
 * Returns users; talking to the database returns a promise
 * @param {*} req 
 * @param {*} res 
 * @access Private (after auth is added)
 */
const getUser= asyncHandler(async(req,res)=>{
    const user=await User.find()

    res.status(200).json({
        message:'getting users',
        user:user
    })
});

/**
 * Updates user
 * @param {*} req 
 * @param {*} res 
 * @route PUT api/user/:id
 * @access Private (after auth is added)
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
 * Returns users
 * @param {*} req 
 * @param {*} res 
 * @route POST api/users
 * @access Private (after auth is added)
 */
const setUsers= asyncHandler(async(req,res)=>{
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text body')//will directly log on browser
    }

    const user=await User.create({
        text:req.body.text
    })
    console.log(process.env.MONGO_URI)
    res.status(201).json({
        message:'posting a user(s)',//sends it to a test DB as the collection wasn't specified
        user:user
    
    });
})

/**
 * Returns users
 * @param {*} req 
 * @param {*} res 
 * @route DELETE api/users/:id
 * @access Private (after auth is added)
 */
const deleteUser= asyncHandler(async(req,res)=>{

    const {id}=req.params;
    const user=User.findById(id);

    if(!user){
        res.status(401);
        throw new Error('user not found')
    };

    await User.findByIdAndDelete(id)
    //the id params is fetches as a params
    res.status(200).json({message:`deleting user #${id}`})
})

module.exports={
    setUsers,
    getUser,
    deleteUser,
    updateUser
}