const asyncHandler=require('express-async-handler');
const Goal=require('../models/goalModel')

/**
 * Returns goals; talking to the database returns a promise
 * @param {*} req 
 * @param {*} res 
 * @access Private (after auth is added)
 */
const getGoals= asyncHandler(async(req,res)=>{
    const goals=await Goal.find()

    res.status(200).json({
        message:'getting goals',
        goals:goals
    })
});

/**
 * Updates goal
 * @param {*} req 
 * @param {*} res 
 * @route PUT api/goals/:id
 * @access Private (after auth is added)
 */
const updateGoal= asyncHandler(async(req,res)=>{

    const {id}=req.params;
    const goal=await Goal.findById(id)
    if (!goal){
        res.status(400);
        throw new Error('Goal not found')
    };
    const updatedGoal=await Goal.findByIdAndUpdate(id,req.body,{
        new:true
    })
    //new:true creates the element if not found
    
    res.status(200).json(updatedGoal)

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

    const goal=await Goal.create({
        text:req.body.text
    })
    console.log(process.env.MONGO_URI)
    res.status(201).json({
        message:'posting a goals',//sends it to a test DB as the collection wasn't specified
        goal:goal
    
    });
})

/**
 * Returns goals
 * @param {*} req 
 * @param {*} res 
 * @route DELETE api/goals/:id
 * @access Private (after auth is added)
 */
const deleteGoal= asyncHandler(async(req,res)=>{

    const {id}=req.params;
    const goal=Goal.findById(id);

    if(!goal){
        res.status(401);
        throw new Error('Goal not found')
    };

    await Goal.findByIdAndDelete(id)

    

    //the id params is fetches as a params
    res.status(200).json({message:`deleting ${id}`})
})

module.exports={
    getGoals,
    deleteGoal,
    setGoals,
    updateGoal
}