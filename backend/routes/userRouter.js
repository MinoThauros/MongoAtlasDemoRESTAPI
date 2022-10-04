const express=require('express');
const router=express.Router();
const {getUser,deleteUser,setUsers,updateUser}=require('../controllers/userController')


router.route('/')
    .post(setUsers)
    .get(getUser)

router.route('/:id')
    .put(updateUser)
    .delete(deleteUser)

module.exports=router;