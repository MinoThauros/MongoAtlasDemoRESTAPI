/**
 * Creating custom error handler which polls the .env and logs errors accordingly
 * receives all the err(s) in the system
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode:500;
    //500 being a generic server error
    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV==='production' ? null:err.stack
    })
}

module.exports={
    errorHandler,
}