const express=require('express');
const router=express.Router()
const {getGoals,deleteGoal,setGoals,updateGoal}=require('../controllers/goalsControler')
//we can perform object deconstruction in commonJs
const {protect}=require('../middleware/authMiddleware')


/**
 * router.get('/',getGoals)
router.post('/',setGoals )
router.delete('/:id',deleteGoal )
router.put('/:id',updateGoal)
 */


//alternatively
router.route('/')
    .get(protect,getGoals)
    .post(protect,setGoals)

router.route('/:id')
    .put(protect,updateGoal)
    .delete(protect,deleteGoal)

module.exports=router;//a way to export router as defined here to lik it to the global pipeline