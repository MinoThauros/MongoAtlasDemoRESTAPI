
const asyncHandler=require('express-async-handler')

/**
 * Returns goals; talking to the database returns a promise
 * @param {*} req 
 * @param {*} res 
 * @access Private (after auth is added)
 */
const getGoals= asyncHandler(async(req,res)=>{

    res.status(200).json({message:'get goals'})
});

/**
 * Updates goal
 * @param {*} req 
 * @param {*} res 
 * @route PUT api/goals/:id
 * @access Private (after auth is added)
 */
const updateGoal= asyncHandler(async(req,res)=>{
    res.status(200).json({message:`updating ${req.params.id}`})
});

/**
 * Returns goals
 * @param {*} req 
 * @param {*} res 
 * @route POST api/goals
 * @access Private (after auth is added)
 */
const setGoals= asyncHandler(async(req,res)=>{
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text body')//will directly log on browser
    }
    //console.log(req.body)
    res.status(201).json({message:'posting goals'});
})

/**
 * Returns goals
 * @param {*} req 
 * @param {*} res 
 * @route DELETE api/goals/:id
 * @access Private (after auth is added)
 */
const deleteGoal= asyncHandler(async(req,res)=>{
    //the id params is fetches as a params
    res.status(200).json({message:`deleting ${req.params.id}`})
})

module.exports={
    getGoals,
    deleteGoal,
    setGoals,
    updateGoal
}