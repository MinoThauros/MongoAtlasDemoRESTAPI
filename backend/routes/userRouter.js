const express=require('express');
const router=express.Router();
const {loginUser,registerUser,getMe}=require('../controllers/userController')
const {protect}=require('../middleware/authMiddleware')



router.post('/',registerUser)
//create new user
router.post('/login',loginUser)
//verify and return user 
router.get('/me',protect,getMe)//using the protect middleware; adding it as a prop
module.exports=router;