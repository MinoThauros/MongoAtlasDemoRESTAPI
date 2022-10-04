const express=require('express');
const router=express.Router();
const {loginUser,regiserUser,getMe}=require('../controllers/userController')



router.post('/',regiserUser)
//create new user
router.post('/login',loginUser)
//verify and return user 
router.get('/me',getMe)
module.exports=router;