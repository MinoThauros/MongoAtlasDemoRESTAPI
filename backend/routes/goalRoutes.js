const express=require('express');
const router=express.Router()
const {getGoals,deleteGoal,setGoals,updateGoal}=require('../controllers/goalsControler')
//we can perform object deconstruction in commonJs

/**
 * router.get('/',getGoals)
router.post('/',setGoals )
router.delete('/:id',deleteGoal )
router.put('/:id',updateGoal)
 */


//alternatively
router.route('/')
    .get(getGoals)
    .post(setGoals)

router.route('/:id')
    .put(updateGoal)
    .delete(deleteGoal)

module.exports=router;//a way to export router as defined here to lik it to the global pipeline