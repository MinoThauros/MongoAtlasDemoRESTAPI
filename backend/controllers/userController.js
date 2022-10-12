const asyncHandler=require('express-async-handler');
const User=require('../models/userModel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
/**
 * @desc    Register new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
  
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }
  
    // Check if user exists
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })//creates an instance of user both in the DB and as a local variable 
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        //sending the signed jwt as a response
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
  

/**  
@desc    Authenticate a user
@route   POST /api/users/login
@access  Public
*/
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    // Check for user email
    const user = await User.findOne({ email })
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        //we generate another token on login
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  })

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
  const {_id,name,email}=await User.findById(req.user.id)

  res.status(200).json({
    id:_id,
    name,
    email
  })
});

/**
 * takes in an object and jwt-signs it
 * @param {*} id the id of the object to be signed
 * @returns a signed token with a 30 days expiration
 */
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })

}
module.exports={
    registerUser,
    loginUser,
    updateUser,
    getMe 
}