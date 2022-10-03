const express=require('express');
const dontenv=require('dotenv').config();
const port=process.env.PORT || 8000;
const app=express()
const router=express.Router()

app.get('/',(req,res,next)=>{
    res.status(200).send('Welcome to the API tuto')

})
//linking a folder to a certain link
app.use('/api/goals',require('./routes/goalRoutes'))



app.listen(port,()=>console.log(`server started on port ${port}`))