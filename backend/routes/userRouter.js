const express=require('express');
const router=express.Router();
const {loginUser,registerUser,getMe}=require('../controllers/userController')



router.post('/',registerUser)
//create new user
router.post('/login',loginUser)
//verify and return user 
router.get('/me',getMe)
module.exports=router;