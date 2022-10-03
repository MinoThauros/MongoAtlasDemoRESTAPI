/**
 * Returns goals
 * @param {*} req 
 * @param {*} res 
 * @access Private (after auth is added)
 */
const getGoals=(req,res)=>{
    res.status(200).json({message:'get goals'})
};

/**
 * Updates goal
 * @param {*} req 
 * @param {*} res 
 * @route PUT api/goals/:id
 * @access Private (after auth is added)
 */
const updateGoal= (req,res)=>{
    res.status(200).json({message:`updating ${req.params.id}`})
};

/**
 * Returns goals
 * @param {*} req 
 * @param {*} res 
 * @route POST api/goals
 * @access Private (after auth is added)
 */
const setGoals=(req,res)=>{
    res.status(201).json({message:'posting goals'})
}

/**
 * Returns goals
 * @param {*} req 
 * @param {*} res 
 * @route DELETE api/goals/:id
 * @access Private (after auth is added)
 */
const deleteGoal=(req,res)=>{
    //the id params is fetches as a params
    res.status(200).json({message:`deleting ${req.params.id}`})
}

module.exports={
    getGoals,
    deleteGoal,
    setGoals,
    updateGoal
}